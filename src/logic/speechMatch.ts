import { normalize, stripAccents } from './normalize'

const UNITS = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
  'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
  'veintiuno', 'veintidos', 'veintitres', 'veinticuatro', 'veinticinco', 'veintiseis', 'veintisiete', 'veintiocho', 'veintinueve']
const TENS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']

/** 0–100 as Spanish words without accents; other numbers unchanged */
export function numberToSpanish(n: number): string {
  if (n < 30) return UNITS[n]
  if (n === 100) return 'cien'
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ` y ${UNITS[n % 10]}` : '')
  return String(n)
}

/** normalised word list; digits become words, un/una/uno are treated alike */
function words(s: string): string[] {
  const prepared = s.replace(/€/g, ' euros ').replace(/\bwi[\s-]?fi\b/gi, 'wifi')
  return stripAccents(normalize(prepared))
    .split(' ')
    .flatMap((w) => (/^\d+$/.test(w) ? numberToSpanish(Number(w)).split(' ') : [w]))
    .map((w) => (w === 'un' || w === 'una' ? 'uno' : w))
    .filter(Boolean)
}

/** true when any recognised alternative is close enough to the target sentence */
export function matchSpeech(heard: string[], target: string): boolean {
  const t = words(target)
  if (t.length === 0) return false
  return heard.some((h) => {
    const hw = words(h)
    if (hw.length === 0) return false
    if (t.length <= 3) return hw.join(' ') === t.join(' ')
    if (t.length > hw.length + 1) return false
    const pool = [...hw]
    let hits = 0
    for (const w of t) {
      const i = pool.indexOf(w)
      if (i >= 0) {
        hits++
        pool.splice(i, 1)
      }
    }
    return hits / t.length >= 0.8
  })
}
