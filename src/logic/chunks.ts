export interface Chunk {
  text: string
  /** position in the original sentence: sentence.slice(start, end) === text */
  start: number
  end: number
}

const WORD = /[\p{L}\p{N}]+/gu
const CLAUSE_BREAK = /[,.;:!?]/

export function wordCount(s: string): number {
  return Array.from(s.matchAll(WORD)).length
}

/**
 * Splits a sentence into parts of at most `max` words: first at punctuation
 * (, . ; : ! ?), then long clauses into roughly equal parts.
 */
export function chunkSentence(sentence: string, max: number): Chunk[] {
  const words = Array.from(sentence.matchAll(WORD), (m) => ({ start: m.index!, end: m.index! + m[0].length }))
  if (!words.length) return []
  const clauses: (typeof words)[] = [[words[0]]]
  for (let i = 1; i < words.length; i++) {
    const between = sentence.slice(words[i - 1].end, words[i].start)
    if (CLAUSE_BREAK.test(between)) clauses.push([])
    clauses[clauses.length - 1].push(words[i])
  }
  const out: Chunk[] = []
  for (const clause of clauses) {
    const parts = Math.ceil(clause.length / max)
    const base = Math.floor(clause.length / parts)
    let extra = clause.length % parts
    let i = 0
    for (let p = 0; p < parts; p++) {
      const size = base + (extra-- > 0 ? 1 : 0)
      const first = clause[i]
      const last = clause[i + size - 1]
      out.push({ text: sentence.slice(first.start, last.end), start: first.start, end: last.end })
      i += size
    }
  }
  return out
}
