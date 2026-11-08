import { diffAnswer, explainWord } from './answerDiff'

const statuses = (given: string, accepted: string[]) => diffAnswer(given, accepted).words.map((w) => w.status)

describe('diffAnswer', () => {
  it('marks every word ok for a correct answer, ignoring case, accents and punctuation', () => {
    expect(statuses('donde esta el bano', ['¿Dónde está el baño?'])).toEqual(['ok', 'ok', 'ok', 'ok'])
  })

  it('keeps the expected words with their punctuation for display', () => {
    expect(diffAnswer('donde esta', ['¿Dónde está el baño?']).words.map((w) => w.expected)).toEqual([
      '¿Dónde',
      'está',
      'el',
      'baño?',
    ])
  })

  it('finds missing words', () => {
    expect(statuses('donde esta bano', ['¿Dónde está el baño?'])).toEqual(['ok', 'ok', 'missing', 'ok'])
  })

  it('finds extra words', () => {
    const d = diffAnswer('yo quiero un café', ['Quiero un café'])
    expect(d.words.map((w) => w.status)).toEqual(['ok', 'ok', 'ok'])
    expect(d.extra).toEqual(['yo'])
  })

  it('recognises a wrong verb form and both readings', () => {
    const d = diffAnswer('tú quiero un té', ['Tú quieres un té'])
    const w = d.words[1]
    expect(w.status).toBe('verb')
    expect(w.given).toBe('quiero')
    expect(w.verb?.infinitive).toBe('querer')
    expect(w.verb?.expected).toContainEqual({ tense: 'presente', person: 1 })
    expect(w.verb?.given).toContainEqual({ tense: 'presente', person: 0 })
  })

  it('recognises a wrong article', () => {
    expect(statuses('el cerveza', ['la cerveza'])).toEqual(['article', 'ok'])
  })

  it('recognises a spelling mistake', () => {
    expect(statuses('una servesa', ['una cerveza'])).toEqual(['ok', 'spelling'])
  })

  it('recognises a word in the wrong place', () => {
    const d = diffAnswer('café un', ['un café'])
    expect(d.words.map((w) => w.status)).toContain('order')
    expect(d.extra).toEqual([])
  })

  it('compares against the closest accepted answer', () => {
    const d = diffAnswer('una cerbeza', ['una caña', 'una cerveza'])
    expect(d.words.map((w) => w.expected)).toEqual(['una', 'cerveza'])
  })

  it('marks plain wrong words', () => {
    expect(statuses('una mesa', ['una cerveza'])).toEqual(['ok', 'wrong'])
  })
})

describe('explainWord', () => {
  it('explains each kind of mistake in Dutch', () => {
    const [, verb] = diffAnswer('tú quiero', ['Tú quieres']).words
    expect(explainWord(verb)).toMatch(/werkwoord.*querer/i)
    expect(explainWord(verb)).toMatch(/quiero.*ik/)
    expect(explainWord(diffAnswer('el cerveza', ['la cerveza']).words[0])).toMatch(/lidwoord/i)
    expect(explainWord(diffAnswer('servesa', ['cerveza']).words[0])).toMatch(/spel/i)
    expect(explainWord(diffAnswer('', ['cerveza']).words[0])).toMatch(/ontbreekt/i)
    expect(explainWord(diffAnswer('cerveza', ['cerveza']).words[0])).toMatch(/goed/i)
  })
})
