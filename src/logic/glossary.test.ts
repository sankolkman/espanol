import { buildGlossary, lookupWord, tokenize } from './glossary'

const g = buildGlossary([
  { id: '1', es: 'el pan', nl: 'het brood' },
  { id: '2', es: 'perdonar', nl: 'vergeven', forms: ['perdona', 'perdonamos', 'perdónanos'] },
  { id: '3', es: 'el discípulo', nl: 'de leerling' },
  { id: '4', es: 'Dios', nl: 'God' },
])

describe('glossary', () => {
  it('finds nouns without their article, in plural, case- and accent-insensitive', () => {
    expect(lookupWord(g, 'pan')?.nl).toBe('het brood')
    expect(lookupWord(g, 'panes')?.nl).toBe('het brood')
    expect(lookupWord(g, 'Discípulos')?.nl).toBe('de leerling')
    expect(lookupWord(g, 'discipulo')?.nl).toBe('de leerling')
  })
  it('finds listed verb forms', () => {
    expect(lookupWord(g, 'Perdónanos')?.es).toBe('perdonar')
    expect(lookupWord(g, 'perdonamos')?.nl).toBe('vergeven')
  })
  it('returns undefined for unknown words', () => {
    expect(lookupWord(g, 'barca')).toBeUndefined()
  })
  it('tokenizes text into words and separators', () => {
    expect(tokenize('¡Señor, sálvanos!')).toEqual([
      { text: '¡', word: false },
      { text: 'Señor', word: true },
      { text: ', ', word: false },
      { text: 'sálvanos', word: true },
      { text: '!', word: false },
    ])
  })
})
