import type { Passage, Reading, Sentence } from '../types'
import text from './text.json'

const T: Record<string, string> = text

export const BOOK_NAMES: Record<string, string> = {
  MAT: 'Mateo',
  MAR: 'Marcos',
  LUK: 'Lucas',
  JOH: 'Juan',
  '1CO': '1 Corintios',
  '1JO': '1 Juan',
  ROM: 'Romanos',
  PHI: 'Filipenses',
  '1TH': '1 Tesalonicenses',
  HEB: 'Hebreos',
  ACT: 'Hechos',
  REV: 'Apocalipsis',
}

/** verse text, e.g. verse('MAT 6:9'); throws for unknown refs so content errors surface in tests */
export function verse(ref: string): string {
  const t = T[ref]
  if (t === undefined) throw new Error(`unknown verse ${ref}`)
  return t
}

/** "MAT 6:9" -> "Mateo 6:9" */
export function displayRef(ref: string): string {
  const [book, cv] = ref.split(' ')
  return `${BOOK_NAMES[book] ?? book} ${cv}`
}

/** passage from [ref, Dutch translation] pairs; Spanish comes from the Bible text */
export function passage(id: string, title: string, ref: string, list: [string, string][], gaps: string[]): Passage {
  return { id, title, ref, verses: list.map(([r, nl]) => ({ ref: displayRef(r), es: verse(r), nl })), gaps }
}

/** sentences taken from passage verses (by index) plus optional short excerpts [es, nl] */
export function verseSentences(lesson: string, p: Passage, picks: number[], extra: [string, string][] = []): Sentence[] {
  const fromVerses = picks.map((i) => ({ es: p.verses[i].es, nl: p.verses[i].nl }))
  return [...fromVerses, ...extra.map(([es, nl]) => ({ es, nl }))].map((s, i) => ({ id: `${lesson}-s-${i + 1}`, ...s }))
}

const plain = (s: string) =>
  s
    .toLowerCase()
    .replace(/[¿¡.,;:!?]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * A short well-known saying taken literally from a verse: [es, "nl (Reference)"].
 * Throws when the Spanish is not in that verse, so a typo surfaces in the tests.
 */
export function saying(ref: string, es: string, nl: string): [string, string] {
  if (!plain(verse(ref)).includes(plain(es))) throw new Error(`"${es}" is not in ${ref}`)
  return [es, `${nl} (${displayRef(ref)})`]
}

/** all verses of a chapter in order; verses this translation leaves out (e.g. Mark 7:16) are skipped */
export function chapterVerses(book: string, chapter: number): { n: number; es: string }[] {
  const prefix = `${book} ${chapter}:`
  return Object.keys(T)
    .filter((k) => k.startsWith(prefix))
    .map((k) => ({ n: Number(k.slice(prefix.length)), es: T[k] }))
    .sort((a, b) => a.n - b.n)
}

/** comprehension questions about a chapter (no text block; you read the chapter in the reader) */
export function chapterQuestions(id: string, title: string, questions: [string, string[], number][]): Reading {
  return { id, title, text: '', questions: questions.map(([q, options, correct]) => ({ q, options, correct })) }
}
