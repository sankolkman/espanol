const PUNCTUATION = /[¿¡.,!?;:"'«»()\-–—…]/g

/** lowercase, strip punctuation (incl. ¿ ¡), collapse whitespace, trim */
export function normalize(s: string): string {
  return s.toLowerCase().replace(PUNCTUATION, ' ').replace(/\s+/g, ' ').trim()
}

/** remove diacritics (á→a, ñ→n, ü→u) */
export function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export type CheckResult = { verdict: 'correct' | 'wrong'; expected: string }

const DUTCH_ARTICLE = /^(de|het|een|'t) /

/**
 * accepted[0] is the canonical expected answer.
 * articleOptional: ignore a leading Dutch article (de/het/een) on both sides.
 */
export function checkAnswer(input: string, accepted: string[], opts: { articleOptional?: boolean } = {}): CheckResult {
  const expected = accepted[0] ?? ''
  const strip = (s: string) => (opts.articleOptional ? s.replace(DUTCH_ARTICLE, '') : s)
  // accents and tildes are ignored: 'buenos dias' = 'buenos días', 'espana' = 'España'
  const key = (s: string) => stripAccents(strip(normalize(s)))
  const n = key(input)
  if (!n) return { verdict: 'wrong', expected }
  return { verdict: accepted.some((a) => key(a) === n) ? 'correct' : 'wrong', expected }
}
