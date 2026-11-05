import { checkAnswer, normalize, stripAccents } from './normalize'

describe('normalize', () => {
  it('lowercases, strips punctuation and collapses spaces', () => {
    expect(normalize('  ¿Dónde  ESTÁ el baño? ')).toBe('dónde está el baño')
    expect(normalize('¡Hola, buenos días!')).toBe('hola buenos días')
  })
  it('stripAccents removes diacritics including ñ', () => {
    expect(stripAccents('España café')).toBe('Espana cafe')
  })
})

describe('checkAnswer', () => {
  it('accepts exact answers', () => {
    expect(checkAnswer('¿Dónde está el baño?', ['¿Dónde está el baño?']).verdict).toBe('correct')
  })
  it('ignores missing accents and tildes', () => {
    expect(checkAnswer('  donde ESTÁ el baño ', ['¿Dónde está el baño?']).verdict).toBe('correct')
    expect(checkAnswer('espana', ['España']).verdict).toBe('correct')
    expect(checkAnswer('buenos dias', ['buenos días']).verdict).toBe('correct')
  })
  it('ignores case and punctuation', () => {
    expect(checkAnswer('dónde está el baño', ['¿Dónde está el baño?']).verdict).toBe('correct')
  })
  it('accepts alternatives but reports the canonical answer', () => {
    const r = checkAnswer('una cerveza', ['una caña', 'una cerveza'])
    expect(r.verdict).toBe('correct')
    expect(r.expected).toBe('una caña')
  })
  it('rejects wrong answers', () => {
    expect(checkAnswer('hola', ['adiós']).verdict).toBe('wrong')
  })
  it('rejects empty input', () => {
    expect(checkAnswer('   ', ['hola']).verdict).toBe('wrong')
  })
})

describe('checkAnswer with optional articles (Dutch)', () => {
  it('accepts a missing or different Dutch article', () => {
    expect(checkAnswer('koffie', ['de koffie'], { articleOptional: true }).verdict).toBe('correct')
    expect(checkAnswer('het koffie', ['de koffie'], { articleOptional: true }).verdict).toBe('correct')
    expect(checkAnswer('een koffie', ['de koffie'], { articleOptional: true }).verdict).toBe('correct')
  })
  it('stays strict without the option', () => {
    expect(checkAnswer('koffie', ['de koffie']).verdict).toBe('wrong')
  })
})
