import { matchSpeech } from './speechMatch'

describe('matchSpeech', () => {
  it('ignores accents and punctuation', () => {
    expect(matchSpeech(['Donde esta el baño'], '¿Dónde está el baño?')).toBe(true)
  })
  it('accepts any alternative', () => {
    expect(matchSpeech(['hola buenas', 'hola buenos días'], 'Hola, buenos días')).toBe(true)
  })
  it('tolerates one missed word in a long sentence', () => {
    expect(matchSpeech(['quisiera un café con leche'], 'Quisiera un café con leche, por favor')).toBe(false)
    expect(matchSpeech(['quisiera un café con leche por favo'], 'Quisiera un café con leche, por favor')).toBe(true)
  })
  it('rejects different words', () => {
    expect(matchSpeech(['adiós'], 'buenos días')).toBe(false)
  })
  it('rejects empty results', () => {
    expect(matchSpeech([], 'hola')).toBe(false)
  })
  it('requires exact match for short targets', () => {
    expect(matchSpeech(['hola'], 'Hola')).toBe(true)
    expect(matchSpeech(['ola que'], 'Hola, ¿qué tal?')).toBe(false)
  })
})

describe('matchSpeech with digits and symbols', () => {
  it('accepts digits for spoken numbers', () => {
    expect(matchSpeech(['somos 5'], 'Somos cinco.')).toBe(true)
    expect(matchSpeech(['cuesta 20 €'], 'Cuesta veinte euros.')).toBe(true)
    expect(matchSpeech(['1 mesa para 4 por favor'], 'Una mesa para cuatro, por favor.')).toBe(true)
    expect(matchSpeech(['son las 3 y media'], 'Son las tres y media.')).toBe(true)
  })
  it('joins wi fi', () => {
    expect(matchSpeech(['cuál es la contraseña del wi fi'], '¿Cuál es la contraseña del wifi?')).toBe(true)
  })
})
