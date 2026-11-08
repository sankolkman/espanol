import { chunkSentence, wordCount } from './chunks'

describe('chunkSentence', () => {
  const s = 'Dios amó tanto al mundo que dio a su Hijo Unigénito, para que todo el que cree en Él no perezca.'

  it('splits into parts of at most 6 words, in order, covering the sentence', () => {
    const parts = chunkSentence(s, 6)
    for (const p of parts) expect(wordCount(p.text)).toBeLessThanOrEqual(6)
    expect(parts.map((p) => p.text).join(' ').replace(/\s+/g, ' ')).toBe(s.replace(/[,.]/g, '').replace(/\s+/g, ' ').trim())
    for (const p of parts) expect(s.slice(p.start, p.end)).toBe(p.text)
  })

  it('prefers to split at punctuation', () => {
    const parts = chunkSentence('Pidan y se les dará. Busquen y hallarán.', 6)
    expect(parts.map((p) => p.text)).toEqual(['Pidan y se les dará', 'Busquen y hallarán'])
  })

  it('keeps short sentences whole', () => {
    expect(chunkSentence('Dios es amor.', 6).map((p) => p.text)).toEqual(['Dios es amor'])
  })

  it('balances long clauses', () => {
    const parts = chunkSentence('uno dos tres cuatro cinco seis siete ocho', 6)
    expect(parts.map((p) => wordCount(p.text))).toEqual([4, 4])
  })
})
