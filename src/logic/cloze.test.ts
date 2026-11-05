import type { Passage } from '../content/types'
import { clozeVerses } from './cloze'

const passage = (gaps: string[]): Passage => ({
  id: 'p',
  title: 'Padre nuestro',
  ref: 'Mateo 6:9-11',
  verses: [
    { ref: '9', es: 'Padre nuestro celestial, santificado sea tu Nombre.', nl: '' },
    { ref: '10', es: 'Venga tu reino. Que se haga tu voluntad en la tierra, como en el cielo.', nl: '' },
    { ref: '11', es: 'El pan nuestro de cada día, dánoslo hoy.', nl: '' },
  ],
  gaps,
})

describe('clozeVerses', () => {
  it('blanks gaps in order across verses', () => {
    const v = clozeVerses(passage(['Padre', 'reino', 'tierra', 'pan']))
    expect(v[0]).toEqual([{ gap: 0 }, { text: ' nuestro celestial, santificado sea tu Nombre.' }])
    expect(v[1]).toEqual([
      { text: 'Venga tu ' },
      { gap: 1 },
      { text: '. Que se haga tu voluntad en la ' },
      { gap: 2 },
      { text: ', como en el cielo.' },
    ])
    expect(v[2]).toEqual([{ text: 'El ' }, { gap: 3 }, { text: ' nuestro de cada día, dánoslo hoy.' }])
  })

  it('only matches whole words', () => {
    // "tu" must not match inside "celestial" or "santificado"; first whole "tu" is in verse 9
    const v = clozeVerses(passage(['tu']))
    expect(v[0]).toEqual([{ text: 'Padre nuestro celestial, santificado sea ' }, { gap: 0 }, { text: ' Nombre.' }])
  })

  it('matches accented words', () => {
    const v = clozeVerses(passage(['día']))
    expect(v[2]).toContainEqual({ gap: 0 })
  })

  it('throws when a gap is missing or out of order', () => {
    expect(() => clozeVerses(passage(['ángel']))).toThrow(/ángel/)
    expect(() => clozeVerses(passage(['pan', 'Padre']))).toThrow(/Padre/)
  })
})
