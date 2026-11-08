import type { Dialogue, Lesson, Passage, Reading, Word } from '../content/types'
import { normalize } from './normalize'
import { mulberry32, shuffle } from './shuffle'
import { pickReview, type ItemProgress } from './srs'

export type Exercise =
  | { kind: 'intro'; itemId: string; word: Word }
  | { kind: 'choice'; itemId: string; prompt: string; promptLang: 'es' | 'nl'; options: string[]; answer: string }
  | { kind: 'type'; itemId: string; prompt: string; promptLang: 'es' | 'nl'; accepted: string[] }
  | { kind: 'build'; itemId: string; promptNl: string; tiles: string[]; answer: string }
  /** gap: long sentences show the text with one word left out; only that word is typed */
  | { kind: 'listen'; itemId: string; es: string; accepted: string[]; gap?: { before: string; after: string } }
  | { kind: 'speak'; itemId: string; es: string; nl: string; altEs?: string[] }
  | { kind: 'grammar'; itemId: string; prompt: string; nl?: string; accepted: string[] }
  | { kind: 'dialogue'; itemId: string; dialogue: Dialogue }
  | { kind: 'reading'; itemId: string; reading: Reading }
  /** fill the gaps of a passage from a word bank */
  | { kind: 'cloze'; itemId: string; passage: Passage; bank: string[] }

export interface ReviewPoolItem {
  id: string
  es: string
  nl: string
  isWord: boolean
  altEs?: string[]
  altNl?: string[]
}

export interface BuildOptions {
  speech: boolean
  seed: number
  now: number
}

/** exercises per lesson, not counting the new-word intro cards */
const TARGET = 20
const MAX_EXERCISES = 25
const REVIEW_SHARE = 0.3
const MAX_GRAMMAR = 3
const HARD_FROM_LESSON = 8

type Form = 'choice-es' | 'choice-nl' | 'type-nl' | 'type-es' | 'build' | 'listen' | 'speak'

const WORD_FORMS: Form[] = ['choice-nl', 'type-nl', 'listen', 'choice-es', 'speak', 'type-es']
const WORD_FORMS_HARD: Form[] = ['type-nl', 'speak', 'type-es', 'listen', 'choice-nl', 'type-nl']
const SENTENCE_FORMS: Form[] = ['build', 'choice-es', 'listen', 'type-nl', 'speak']
const SENTENCE_FORMS_HARD: Form[] = ['type-nl', 'speak', 'build', 'listen', 'type-nl']
/** long sentences (Bible verses): recognise and say them, don't type or build them */
const LONG_SENTENCE_FORMS: Form[] = ['choice-es', 'listen', 'speak', 'choice-nl']
/** from this many words on, listening asks for one missing word instead of the whole sentence */
const LISTEN_GAP_WORDS = 6
const LONG_SENTENCE_WORDS = 9
const CLOZE_DISTRACTORS = 2

const isLong = (item: ReviewPoolItem) => !item.isWord && item.es.split(/\s+/).length >= LONG_SENTENCE_WORDS

export function toPoolItems(lesson: Lesson): ReviewPoolItem[] {
  return [
    ...lesson.words.map((w) => ({ id: w.id, es: w.es, nl: w.nl, isWord: true, altEs: w.altEs, altNl: w.altNl })),
    ...lesson.sentences.map((s) => ({ id: s.id, es: s.es, nl: s.nl, isWord: false, altEs: s.altEs })),
  ]
}

export function reviewPool(lessonsBefore: Lesson[]): ReviewPoolItem[] {
  return lessonsBefore.flatMap(toPoolItems)
}

/** sentence split into tiles without punctuation */
export function sentenceTiles(es: string): string[] {
  return es
    .replace(/[¿¡.,!?;:"]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function makeExercise(
  item: ReviewPoolItem,
  form: Form,
  all: ReviewPoolItem[],
  rng: () => number,
): Exercise {
  const accEs = [item.es, ...(item.altEs ?? [])]
  const same = all.filter((x) => x.isWord === item.isWord && x.id !== item.id)
  const options = (pick: (x: ReviewPoolItem) => string, alsoCorrect: string[]): string[] => {
    const answer = pick(item)
    const seen = new Set([answer, ...alsoCorrect].map(normalize))
    const out = [answer]
    for (const x of shuffle(same.length >= 3 ? same : all.filter((y) => y.id !== item.id), rng)) {
      const v = pick(x)
      if (seen.has(normalize(v))) continue
      seen.add(normalize(v))
      out.push(v)
      if (out.length === 4) break
    }
    return shuffle(out, rng)
  }
  switch (form) {
    case 'choice-es':
      return { kind: 'choice', itemId: item.id, prompt: item.es, promptLang: 'es', options: options((x) => x.nl, item.altNl ?? []), answer: item.nl }
    case 'choice-nl':
      return { kind: 'choice', itemId: item.id, prompt: item.nl, promptLang: 'nl', options: options((x) => x.es, item.altEs ?? []), answer: item.es }
    case 'type-nl':
      return { kind: 'type', itemId: item.id, prompt: item.nl, promptLang: 'nl', accepted: accEs }
    case 'type-es':
      return { kind: 'type', itemId: item.id, prompt: item.es, promptLang: 'es', accepted: [item.nl, ...(item.altNl ?? [])] }
    case 'listen':
      return listenExercise(item, accEs, rng)
    case 'speak':
      return { kind: 'speak', itemId: item.id, es: item.es, nl: item.nl, ...(item.altEs ? { altEs: item.altEs } : {}) }
    case 'build': {
      const tiles = sentenceTiles(item.es)
      const own = new Set(tiles.map(normalize))
      const extra = shuffle(
        [...new Set(all.filter((x) => !x.isWord && x.id !== item.id).flatMap((x) => sentenceTiles(x.es)))].filter(
          (t) => !own.has(normalize(t)),
        ),
        rng,
      ).slice(0, 2)
      return { kind: 'build', itemId: item.id, promptNl: item.nl, tiles: shuffle([...tiles, ...extra], rng), answer: tiles.join(' ') }
    }
  }
}

/** picks the next allowed form for an item, rotating through the list */
function formFor(item: ReviewPoolItem, turn: number, speech: boolean, hard: boolean): Form {
  const list = item.isWord
    ? hard
      ? WORD_FORMS_HARD
      : WORD_FORMS
    : isLong(item)
      ? LONG_SENTENCE_FORMS
      : hard
        ? SENTENCE_FORMS_HARD
        : SENTENCE_FORMS
  const allowed = list.filter((f) => speech || (f !== 'listen' && f !== 'speak'))
  return allowed[turn % allowed.length]
}

export function buildLesson(
  lesson: Lesson,
  before: Lesson[],
  progress: Record<string, ItemProgress>,
  opts: BuildOptions,
): Exercise[] {
  const rng = mulberry32(opts.seed)
  const hard = before.length >= HARD_FROM_LESSON
  const current = toPoolItems(lesson)
  const pool = reviewPool(before)
  const everything = [...current, ...pool]
  const turnOf = new Map<string, number>()
  const next = (item: ReviewPoolItem) => {
    const t = turnOf.get(item.id) ?? Math.floor(rng() * 6)
    turnOf.set(item.id, t + 1)
    return makeExercise(item, formFor(item, t, opts.speech, hard), everything, rng)
  }

  // tail: grammar, dialogue, reading
  const tail: Exercise[] = []
  for (const g of shuffle(lesson.grammar?.items ?? [], rng).slice(0, MAX_GRAMMAR)) {
    tail.push({ kind: 'grammar', itemId: g.id, prompt: g.prompt, nl: g.nl, accepted: [g.answer, ...(g.alt ?? [])] })
  }
  if (lesson.dialogue) tail.push({ kind: 'dialogue', itemId: lesson.dialogue.id, dialogue: lesson.dialogue })
  if (lesson.passage) tail.push(clozeExercise(lesson, rng))
  if (lesson.reading) tail.push({ kind: 'reading', itemId: lesson.reading.id, reading: lesson.reading })

  // every new word and sentence is practised at least once; review fills ~30%
  // big lessons give up some review so a lesson stays at most MAX_EXERCISES
  const reviewCount = Math.max(
    0,
    Math.min(pool.length, Math.round(TARGET * REVIEW_SHARE), MAX_EXERCISES - current.length - tail.length),
  )
  const practiceCount = Math.max(current.length, TARGET - reviewCount - tail.length)

  // practice items: alternate sentences and words, cycling until practiceCount is reached
  const wordItems = current.filter((x) => x.isWord)
  const sentenceItems = current.filter((x) => !x.isWord)
  const ordered: ReviewPoolItem[] = []
  for (let i = 0; i < Math.max(wordItems.length, sentenceItems.length); i++) {
    if (wordItems[i]) ordered.push(wordItems[i])
    if (sentenceItems[i]) ordered.push(sentenceItems[i])
  }
  const practiceItems: ReviewPoolItem[] = []
  for (let i = 0; practiceItems.length < practiceCount && ordered.length > 0; i++) {
    practiceItems.push(ordered[i % ordered.length])
  }
  const words = practiceItems.filter((x) => x.isWord)
  const sentences = practiceItems.filter((x) => !x.isWord)

  const out: Exercise[] = []
  // introduce words in groups of 3, each group followed by practice on that group
  const wordGroups: Word[][] = []
  for (let i = 0; i < lesson.words.length; i += 3) wordGroups.push(lesson.words.slice(i, i + 3))
  const firstRoundWords = new Set<string>()
  for (const group of wordGroups) {
    for (const word of group) out.push({ kind: 'intro', itemId: word.id, word })
    const ids = new Set(group.map((x) => x.id))
    const groupPractice = words.filter((x) => ids.has(x.id) && !firstRoundWords.has(x.id) && firstRoundWords.add(x.id))
    out.push(...shuffle(groupPractice.map(next), rng))
  }
  // remaining word practice + sentences + review, mixed
  const restWords = [...words]
  for (const id of firstRoundWords) restWords.splice(restWords.findIndex((x) => x.id === id), 1)
  const reviewIds = pickReview(
    pool.map((x) => x.id),
    progress,
    reviewCount,
    opts.now,
  )
  const reviewItems = reviewIds.map((id) => pool.find((x) => x.id === id)!)
  out.push(...shuffle([...restWords, ...sentences, ...reviewItems].map(next), rng))
  return [...out, ...tail]
}

export function buildReviewSession(
  completed: Lesson[],
  progress: Record<string, ItemProgress>,
  opts: BuildOptions,
): Exercise[] {
  const pool = reviewPool(completed)
  if (pool.length === 0) return []
  const rng = mulberry32(opts.seed)
  const ids = pickReview(
    pool.map((x) => x.id),
    progress,
    15,
    opts.now,
  )
  const items: ReviewPoolItem[] = []
  for (let i = 0; items.length < 15 && i < ids.length * 2; i++) items.push(pool.find((x) => x.id === ids[i % ids.length])!)
  return shuffle(
    items.map((item, i) => makeExercise(item, formFor(item, i + Math.floor(rng() * 6), opts.speech, true), pool, rng)),
    rng,
  )
}

/** passage fill-in: the gaps plus a few lesson words that are not gaps, shuffled */
export function clozeExercise(lesson: Lesson, rng: () => number): Exercise {
  const p = lesson.passage!
  const taken = new Set(p.gaps.map(normalize))
  const distractors = shuffle(
    lesson.words
      .map((w) => w.forms?.[0] ?? w.es.replace(/^(el|la|los|las|un|una) /i, ''))
      .filter((w) => !taken.has(normalize(w)) && taken.add(normalize(w))),
    rng,
  ).slice(0, CLOZE_DISTRACTORS)
  return { kind: 'cloze', itemId: p.id, passage: p, bank: shuffle([...new Set(p.gaps), ...distractors], rng) }
}

/** listening: short items are typed in full; long sentences show the text with one word left out */
function listenExercise(item: ReviewPoolItem, accepted: string[], rng: () => number): Exercise {
  const words = Array.from(item.es.matchAll(/[\p{L}\p{N}]+/gu), (m) => ({ text: m[0], at: m.index! }))
  if (item.isWord || words.length < LISTEN_GAP_WORDS) return { kind: 'listen', itemId: item.id, es: item.es, accepted }
  const longer = words.filter((w) => w.text.length >= 4)
  const pool = longer.length ? longer : words.filter((w) => w.text.length >= 3)
  const pick = pool[Math.floor(rng() * pool.length)]
  return {
    kind: 'listen',
    itemId: item.id,
    es: item.es,
    accepted: [pick.text],
    gap: { before: item.es.slice(0, pick.at), after: item.es.slice(pick.at + pick.text.length) },
  }
}
