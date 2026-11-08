import type { Lesson } from '../content/types'
import { buildLesson, buildReviewSession, type Exercise } from './lessonBuilder'

const w = (id: string, es: string, nl: string) => ({ id, es, nl })

const lesson: Lesson = {
  id: 'L2',
  title: 'Test',
  intro: 'intro',
  words: [
    w('w1', 'el café', 'de koffie'),
    w('w2', 'el té', 'de thee'),
    w('w3', 'el agua', 'het water'),
    w('w4', 'la leche', 'de melk'),
    w('w5', 'el zumo', 'het sap'),
    w('w6', 'la cerveza', 'het bier'),
  ],
  sentences: [
    { id: 's1', es: 'Un café, por favor.', nl: 'Een koffie, alsjeblieft.' },
    { id: 's2', es: 'Quisiera un té.', nl: 'Ik zou graag een thee willen.' },
    { id: 's3', es: '¿Tiene zumo de naranja?', nl: 'Heeft u sinaasappelsap?' },
  ],
  grammar: {
    id: 'g',
    title: 'querer',
    explanation: 'x',
    items: [
      { id: 'g1', prompt: 'Yo ___ un café.', answer: 'quiero' },
      { id: 'g2', prompt: 'Tú ___ un té.', answer: 'quieres' },
      { id: 'g3', prompt: 'Él ___ agua.', answer: 'quiere' },
    ],
  },
  dialogue: {
    id: 'd',
    title: 'En el bar',
    turns: [
      { speaker: 'Camarero', es: '¿Qué le pongo?', nl: 'Wat mag het zijn?' },
      { speaker: 'Tú', es: 'Un ___, por favor.', nl: 'Een koffie, alsjeblieft.', gap: { answer: 'café' } },
    ],
  },
}

const earlier: Lesson = {
  id: 'L1',
  title: 'Eerder',
  intro: '',
  words: [
    w('e1', 'hola', 'hallo'),
    w('e2', 'adiós', 'dag'),
    w('e3', 'gracias', 'dank je'),
    w('e4', 'sí', 'ja'),
    w('e5', 'no', 'nee'),
    w('e6', 'buenos días', 'goedemorgen'),
    w('e7', 'buenas noches', 'goedenacht'),
    w('e8', 'por favor', 'alsjeblieft'),
  ],
  sentences: [
    { id: 'es1', es: 'Me llamo Ana.', nl: 'Ik heet Ana.' },
    { id: 'es2', es: '¿Cómo te llamas?', nl: 'Hoe heet je?' },
  ],
}

const opts = { speech: true, seed: 42, now: 1_000_000 }
const sentenceIds = new Set(['s1', 's2', 's3', 'es1', 'es2'])

/** 15–25 exercises, not counting the short new-word intro cards */
function check(exs: Exercise[]) {
  const n = exs.filter((e) => e.kind !== 'intro').length
  expect(n).toBeGreaterThanOrEqual(15)
  expect(n).toBeLessThanOrEqual(25)
}

describe('buildLesson', () => {
  const exs = buildLesson(lesson, [earlier], {}, opts)

  it('has 15–25 exercises', () => check(exs))

  it('introduces each new word before practising it', () => {
    for (const word of lesson.words) {
      const first = exs.findIndex((e) => e.itemId === word.id)
      expect(exs[first].kind).toBe('intro')
    }
  })

  it('includes ~30% review from earlier lessons', () => {
    const nonIntro = exs.filter((e) => e.kind !== 'intro')
    const earlierIds = new Set([...earlier.words, ...earlier.sentences].map((x) => x.id))
    const review = nonIntro.filter((e) => earlierIds.has(e.itemId))
    expect(review.length / nonIntro.length).toBeGreaterThanOrEqual(0.25)
  })

  it('has no review and still ≥15 exercises without earlier lessons', () => {
    const solo = buildLesson(lesson, [], {}, opts)
    check(solo)
  })

  it('never asks to type a sentence into Dutch', () => {
    for (const e of exs) {
      if (e.kind === 'type' && e.promptLang === 'es') expect(sentenceIds.has(e.itemId)).toBe(false)
    }
  })

  it('omits listen and speak without speech', () => {
    const silent = buildLesson(lesson, [earlier], {}, { ...opts, speech: false })
    expect(silent.some((e) => e.kind === 'listen' || e.kind === 'speak')).toBe(false)
    check(silent)
  })

  it('is deterministic per seed', () => {
    expect(buildLesson(lesson, [earlier], {}, opts)).toEqual(exs)
  })

  it('gives 4 unique options including the answer', () => {
    for (const e of exs) {
      if (e.kind === 'choice') {
        expect(e.options).toContain(e.answer)
        expect(new Set(e.options).size).toBe(4)
      }
    }
  })

  it('places grammar and dialogue after all intros', () => {
    const lastIntro = exs.map((e) => e.kind).lastIndexOf('intro')
    const g = exs.findIndex((e) => e.kind === 'grammar')
    const d = exs.findIndex((e) => e.kind === 'dialogue')
    expect(g).toBeGreaterThan(lastIntro)
    expect(d).toBeGreaterThan(lastIntro)
  })

  it('keeps grammar, dialogue and reading in a big lesson', () => {
    const big: Lesson = {
      ...lesson,
      words: Array.from({ length: 10 }, (_, i) => w(`b${i}`, `palabra${i}`, `woord${i}`)),
      reading: { id: 'r', title: 'Menú', text: 'x', questions: [{ q: 'q', options: ['a', 'b'], correct: 0 }] },
    }
    const exs = buildLesson(big, [earlier], {}, opts)
    check(exs)
    expect(exs.filter((e) => e.kind === 'grammar')).toHaveLength(3)
    expect(exs.some((e) => e.kind === 'dialogue')).toBe(true)
    expect(exs.some((e) => e.kind === 'reading')).toBe(true)
  })

  it('build tiles contain all words of the sentence', () => {
    for (const e of exs) {
      if (e.kind === 'build') {
        const needed = e.answer.split(' ')
        for (const t of needed) expect(e.tiles).toContain(t)
      }
    }
  })
})

describe('buildReviewSession', () => {
  it('builds 15 exercises from completed lessons', () => {
    const exs = buildReviewSession([earlier, lesson], {}, opts)
    expect(exs).toHaveLength(15)
    expect(exs.some((e) => e.kind === 'intro')).toBe(false)
  })
  it('returns nothing without completed lessons', () => {
    expect(buildReviewSession([], {}, opts)).toEqual([])
  })
})

const bigLesson: Lesson = {
  ...lesson,
  id: 'BIG',
  words: Array.from({ length: 10 }, (_, i) => w(`b${i}`, `palabra${i}`, `woord${i}`)),
  sentences: [
    ...lesson.sentences,
    { id: 's4', es: 'Soy holandés.', nl: 'Ik ben Nederlander.', altEs: ['Soy holandesa.'] },
  ],
  grammar: {
    ...lesson.grammar!,
    items: [
      ...lesson.grammar!.items,
      { id: 'g4', prompt: 'Nosotros ___ café.', answer: 'queremos' },
      { id: 'g5', prompt: 'Ellos ___ té.', answer: 'quieren' },
    ],
  },
  reading: { id: 'r', title: 'Menú', text: 'x', questions: [{ q: 'q', options: ['a', 'b'], correct: 0 }] },
}

describe('buildLesson coverage', () => {
  it('practises every new word and sentence at least once', () => {
    for (const seed of [1, 2, 3, 42]) {
      const exs = buildLesson(bigLesson, [earlier], {}, { ...opts, seed })
      check(exs)
      for (const x of [...bigLesson.words, ...bigLesson.sentences]) {
        expect(exs.some((e) => e.itemId === x.id && e.kind !== 'intro')).toBe(true)
      }
    }
  })

  it('varies grammar items between runs', () => {
    const seen = new Set<string>()
    for (let seed = 1; seed <= 30; seed++) {
      for (const e of buildLesson(bigLesson, [earlier], {}, { ...opts, seed })) if (e.kind === 'grammar') seen.add(e.itemId)
    }
    expect(seen.size).toBe(5)
  })

  it('passes alternatives to speak exercises', () => {
    const speaks = Array.from({ length: 40 }, (_, seed) => buildLesson(bigLesson, [earlier], {}, { ...opts, seed }))
      .flat()
      .filter((e) => e.kind === 'speak' && e.itemId === 's4')
    expect(speaks.length).toBeGreaterThan(0)
    for (const e of speaks) if (e.kind === 'speak') expect(e.altEs).toEqual(['Soy holandesa.'])
  })

  it('never offers a correct answer as a distractor', () => {
    const greet: Lesson = {
      ...lesson,
      words: [
        { id: 'h', es: 'hola', nl: 'hallo', altNl: ['dag'] },
        { id: 'a', es: 'adiós', nl: 'dag' },
        { id: 'm', es: 'buenos días', nl: 'goedemorgen' },
        { id: 'n', es: 'buenas noches', nl: 'goedenavond' },
        { id: 't', es: 'buenas tardes', nl: 'goedemiddag', altNl: ['goedenavond'] },
        { id: 'g', es: 'gracias', nl: 'dank je' },
      ],
    }
    for (let seed = 1; seed <= 40; seed++) {
      for (const e of buildLesson(greet, [], {}, { ...opts, seed })) {
        if (e.kind !== 'choice') continue
        if (e.itemId === 'h' && e.promptLang === 'es') expect(e.options).not.toContain('dag')
        if (e.itemId === 't' && e.promptLang === 'es') expect(e.options).not.toContain('goedenavond')
      }
    }
  })
})

describe('Bible lessons', () => {
  const longVerse = 'Dios amó tanto al mundo que dio a su Hijo Unigénito, para que todo el que cree en Él no perezca.'
  const bible: Lesson = {
    id: 'B1',
    title: 'Juan 3:16',
    intro: 'x',
    words: [
      { id: 'bw1', es: 'Dios', nl: 'God' },
      { id: 'bw2', es: 'el mundo', nl: 'de wereld' },
      { id: 'bw3', es: 'el Hijo', nl: 'de Zoon' },
      { id: 'bw4', es: 'la vida', nl: 'het leven' },
      { id: 'bw5', es: 'amar', nl: 'liefhebben', forms: ['amó'] },
      { id: 'bw6', es: 'creer', nl: 'geloven', forms: ['cree'] },
    ],
    sentences: [
      { id: 'bs1', es: longVerse, nl: 'God had de wereld zo lief…' },
      { id: 'bs2', es: 'Dios es amor.', nl: 'God is liefde.' },
    ],
    passage: {
      id: 'bp',
      title: 'Juan 3:16',
      ref: 'Juan 3:16',
      verses: [{ ref: '16', es: longVerse, nl: 'God had de wereld zo lief…' }],
      gaps: ['amó', 'mundo', 'Hijo'],
    },
  }

  it('adds a fill-in exercise with a word bank', () => {
    const exs = buildLesson(bible, [], {}, opts)
    const cloze = exs.filter((e) => e.kind === 'cloze')
    expect(cloze).toHaveLength(1)
    const c = cloze[0]
    if (c.kind !== 'cloze') throw new Error()
    expect(c.itemId).toBe('bp')
    for (const g of ['amó', 'mundo', 'Hijo']) expect(c.bank).toContain(g)
    expect(c.bank.length).toBe(5)
    expect(new Set(c.bank).size).toBe(5)
  })

  it('never asks to type or build a long verse; listening only with one word left out', () => {
    for (let seed = 1; seed <= 30; seed++) {
      for (const e of buildLesson(bible, [], {}, { ...opts, seed })) {
        if (e.itemId !== 'bs1') continue
        expect(['choice', 'speak', 'listen']).toContain(e.kind)
        if (e.kind === 'listen') expect(e.gap).toBeDefined()
      }
    }
  })
})

describe('listening to long sentences', () => {
  const verse = 'Dios amó tanto al mundo que dio a su Hijo Unigénito.'
  const lessonWithVerse: Lesson = {
    ...lesson,
    id: 'LV',
    sentences: [
      { id: 'lv1', es: verse, nl: 'God had de wereld zo lief…' },
      { id: 'lv2', es: 'Dios es amor.', nl: 'God is liefde.' },
    ],
  }
  const listens = (seedMax = 60) =>
    Array.from({ length: seedMax }, (_, seed) => buildLesson(lessonWithVerse, [], {}, { ...opts, seed })).flat()

  it('long sentences are listened to with one word left out', () => {
    const gapped = listens().filter((e) => e.kind === 'listen' && e.itemId === 'lv1')
    expect(gapped.length).toBeGreaterThan(0)
    for (const e of gapped) {
      if (e.kind !== 'listen') continue
      expect(e.gap).toBeDefined()
      const { before, after } = e.gap!
      expect(e.accepted).toHaveLength(1)
      expect(e.accepted[0].split(' ')).toHaveLength(1)
      expect(`${before}${e.accepted[0]}${after}`).toBe(verse)
      expect(e.accepted[0].replace(/[^\p{L}]/gu, '').length).toBeGreaterThanOrEqual(3)
      expect(e.es).toBe(verse)
    }
  })

  it('short sentences are typed in full', () => {
    for (const e of listens()) if (e.kind === 'listen' && e.itemId === 'lv2') expect(e.gap).toBeUndefined()
  })
})
