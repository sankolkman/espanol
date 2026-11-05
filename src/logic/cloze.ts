import type { Passage } from '../content/types'

export type ClozeSegment = { text: string } | { gap: number }

const isLetter = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c)

/** index of `word` in `text` from `from`, as a whole word; -1 if absent */
function findWord(text: string, word: string, from: number): number {
  let i = text.indexOf(word, from)
  while (i >= 0) {
    if (!isLetter(text[i - 1]) && !isLetter(text[i + word.length])) return i
    i = text.indexOf(word, i + 1)
  }
  return -1
}

/**
 * Splits the passage verses into text and gaps. Gaps are found in order:
 * gap n+1 is searched after gap n (same verse or a later one).
 * Throws when a gap can't be found, so content errors surface in tests.
 */
export function clozeVerses(p: Passage): ClozeSegment[][] {
  let g = 0
  const out = p.verses.map((v) => {
    const segs: ClozeSegment[] = []
    let cursor = 0
    while (g < p.gaps.length) {
      const i = findWord(v.es, p.gaps[g], cursor)
      if (i < 0) break
      if (i > cursor) segs.push({ text: v.es.slice(cursor, i) })
      segs.push({ gap: g })
      cursor = i + p.gaps[g].length
      g++
    }
    if (cursor < v.es.length) segs.push({ text: v.es.slice(cursor) })
    return segs
  })
  if (g < p.gaps.length) throw new Error(`gap "${p.gaps[g]}" not found in passage ${p.id}`)
  return out
}
