import { normalize, stripAccents } from './normalize'
import { findVerbForms, PERSON_LABELS, TENSE_LABELS, type Tense } from './verbs'

export type WordStatus = 'ok' | 'missing' | 'order' | 'spelling' | 'article' | 'verb' | 'wrong'

export interface VerbInfo {
  infinitive: string
  expected: { tense: Tense; person: number }[]
  given?: { tense: Tense; person: number }[]
}

export interface DiffWord {
  /** the expected word as written in the answer (with punctuation) */
  expected: string
  /** what the learner wrote in its place, if anything */
  given?: string
  status: WordStatus
  /** set when the expected word is a known verb form */
  verb?: VerbInfo
}

export interface AnswerDiff {
  words: DiffWord[]
  /** words the learner wrote that have no place in the answer */
  extra: string[]
}

const ARTICLES = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'het', 'een'])

const key = (w: string) => stripAccents(normalize(w))
const tokens = (s: string) => s.split(/\s+/).filter((w) => key(w) !== '')

function levenshtein(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

/** pairs of matching token indexes (longest common subsequence) */
function lcs(e: string[], g: string[]): [number, number][] {
  const n = e.length
  const m = g.length
  const L = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--) L[i][j] = e[i] === g[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1])
  const pairs: [number, number][] = []
  for (let i = 0, j = 0; i < n && j < m; ) {
    if (e[i] === g[j]) {
      pairs.push([i, j])
      i++
      j++
    } else if (L[i + 1][j] >= L[i][j + 1]) i++
    else j++
  }
  return pairs
}

function verbInfo(expected: string, given?: string): VerbInfo | undefined {
  const ef = findVerbForms(normalize(expected))
  if (!ef.length) return undefined
  const gf = given ? findVerbForms(normalize(given)) : []
  const shared = ef.find((f) => gf.some((x) => x.infinitive === f.infinitive))
  const infinitive = shared?.infinitive ?? ef[0].infinitive
  const pick = (list: typeof ef) => list.filter((f) => f.infinitive === infinitive).map(({ tense, person }) => ({ tense, person }))
  const g = pick(gf)
  return { infinitive, expected: pick(ef), ...(g.length ? { given: g } : {}) }
}

function classify(expected: string, given: string): WordStatus {
  const e = key(expected)
  const g = key(given)
  if (ARTICLES.has(e) && ARTICLES.has(g)) return 'article'
  const v = verbInfo(expected, given)
  if (v?.given) return 'verb'
  if (levenshtein(e, g) <= (e.length >= 6 ? 2 : 1)) return 'spelling'
  return 'wrong'
}

function diffOne(given: string, expected: string): AnswerDiff {
  const eTok = tokens(expected)
  const gTok = tokens(given)
  const e = eTok.map(key)
  const g = gTok.map(key)
  const words: DiffWord[] = []
  const extra: string[] = []
  let i = 0
  let j = 0
  const flush = (iEnd: number, jEnd: number) => {
    while (i < iEnd && j < jEnd) {
      words.push({ expected: eTok[i], given: gTok[j], status: classify(eTok[i], gTok[j]), verb: verbInfo(eTok[i], gTok[j]) })
      i++
      j++
    }
    while (i < iEnd) words.push({ expected: eTok[i], status: 'missing', verb: verbInfo(eTok[i++]) })
    while (j < jEnd) extra.push(gTok[j++])
  }
  for (const [pi, pj] of lcs(e, g)) {
    flush(pi, pj)
    words.push({ expected: eTok[i], given: gTok[j], status: 'ok', verb: verbInfo(eTok[i]) })
    i++
    j++
  }
  flush(eTok.length, gTok.length)
  // a missing word that the learner did write, elsewhere: wrong place
  for (const w of words) {
    if (w.status !== 'missing') continue
    const k = extra.findIndex((x) => key(x) === key(w.expected))
    if (k >= 0) {
      w.status = 'order'
      w.given = extra[k]
      extra.splice(k, 1)
    }
  }
  for (const w of words) if (!w.verb) delete w.verb
  return { words, extra }
}

const WEIGHT: Record<WordStatus, number> = { ok: 0, spelling: 0.4, article: 0.5, order: 0.5, verb: 0.7, wrong: 1, missing: 1 }
const cost = (d: AnswerDiff) => d.words.reduce((s, w) => s + WEIGHT[w.status], 0) + d.extra.length

/** word-by-word comparison with the accepted answer closest to what was given */
export function diffAnswer(given: string, accepted: string[]): AnswerDiff {
  return accepted.map((a) => diffOne(given, a)).reduce((best, d) => (cost(d) < cost(best) ? d : best))
}

const reading = (r: { tense: Tense; person: number }) => `${PERSON_LABELS[r.person]}, ${TENSE_LABELS[r.tense]}`

/** short Dutch explanation of what happened with one word */
export function explainWord(w: DiffWord): string {
  const exp = normalize(w.expected)
  switch (w.status) {
    case 'ok':
      return 'Goed.'
    case 'missing':
      return `Dit woord ontbreekt in jouw antwoord: "${exp}".`
    case 'order':
      return `Je had "${exp}" wel, maar op een andere plek in de zin.`
    case 'spelling':
      return `Spelfout: je schreef "${w.given}", het moet "${exp}" zijn.`
    case 'article':
      return `Verkeerd lidwoord: je schreef "${w.given}", het moet "${exp}" zijn. Het lidwoord past bij het geslacht (mannelijk of vrouwelijk) en het aantal van het woord erna.`
    case 'verb': {
      const v = w.verb!
      const given = v.given?.length ? ` (${v.given.map(reading).join(' of ')})` : ''
      const expected = v.expected.length ? ` (${v.expected.map(reading).join(' of ')})` : ''
      return `Verkeerde vorm van het werkwoord ${v.infinitive}: je schreef "${w.given}"${given}, het moet "${exp}" zijn${expected}.`
    }
    case 'wrong':
      return `Hier hoort "${exp}"; jij schreef "${w.given}".`
  }
}
