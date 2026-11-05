import type { GrammarItem, Sentence, Word } from './types'

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** word: id = <lesson>-w-<slug of es> */
export function words(lesson: string, list: [string, string, Partial<Word>?][]): Word[] {
  return list.map(([es, nl, extra]) => ({ id: `${lesson}-w-${slug(es)}`, es, nl, ...extra }))
}

/** sentences: id = <lesson>-s-<n> */
export function sentences(lesson: string, list: [string, string, string[]?][]): Sentence[] {
  return list.map(([es, nl, altEs], i) => ({ id: `${lesson}-s-${i + 1}`, es, nl, ...(altEs ? { altEs } : {}) }))
}

/** grammar items: [prompt with ___, answer, nl hint?, alternatives?] */
export function items(lesson: string, list: [string, string, string?, string[]?][]): GrammarItem[] {
  return list.map(([prompt, answer, nl, alt], i) => ({
    id: `${lesson}-g-${i + 1}`,
    prompt,
    answer,
    ...(nl ? { nl } : {}),
    ...(alt ? { alt } : {}),
  }))
}
