import { conjugate, findVerbForms, PERSONS } from './verbs'

describe('conjugate', () => {
  it('regular -ar, -er, -ir in the present', () => {
    expect(conjugate('hablar')!.presente).toEqual(['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'])
    expect(conjugate('comer')!.presente).toEqual(['como', 'comes', 'come', 'comemos', 'coméis', 'comen'])
    expect(conjugate('vivir')!.presente).toEqual(['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'])
  })
  it('regular past, imperfect and future', () => {
    const t = conjugate('tomar')!
    expect(t.preterito).toEqual(['tomé', 'tomaste', 'tomó', 'tomamos', 'tomasteis', 'tomaron'])
    expect(t.imperfecto).toEqual(['tomaba', 'tomabas', 'tomaba', 'tomábamos', 'tomabais', 'tomaban'])
    expect(t.futuro).toEqual(['tomaré', 'tomarás', 'tomará', 'tomaremos', 'tomaréis', 'tomarán'])
    expect(conjugate('vivir')!.preterito).toEqual(['viví', 'viviste', 'vivió', 'vivimos', 'vivisteis', 'vivieron'])
    expect(conjugate('comer')!.imperfecto[0]).toBe('comía')
  })
  it('irregular verbs', () => {
    expect(conjugate('ser')!.presente).toEqual(['soy', 'eres', 'es', 'somos', 'sois', 'son'])
    expect(conjugate('estar')!.presente).toEqual(['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'])
    expect(conjugate('ir')!.presente).toEqual(['voy', 'vas', 'va', 'vamos', 'vais', 'van'])
    expect(conjugate('tener')!.presente).toEqual(['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'])
    expect(conjugate('querer')!.presente).toEqual(['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'])
    expect(conjugate('poder')!.presente).toEqual(['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'])
    expect(conjugate('decir')!.preterito[2]).toBe('dijo')
    expect(conjugate('ser')!.preterito[2]).toBe('fue')
    expect(conjugate('tener')!.futuro[0]).toBe('tendré')
  })
  it('spelling changes in the past tense', () => {
    expect(conjugate('pagar')!.preterito[0]).toBe('pagué')
    expect(conjugate('pecar')!.preterito[0]).toBe('pequé')
    expect(conjugate('creer')!.preterito[2]).toBe('creyó')
  })
  it('reflexive verbs carry their pronoun', () => {
    expect(conjugate('llamarse')!.presente).toEqual(['me llamo', 'te llamas', 'se llama', 'nos llamamos', 'os llamáis', 'se llaman'])
  })
  it('returns null for non-verbs', () => {
    expect(conjugate('casa')).toBeNull()
  })
  it('has six persons', () => {
    expect(PERSONS).toHaveLength(6)
  })
})

describe('findVerbForms', () => {
  it('finds infinitive, tense and person of a form', () => {
    expect(findVerbForms('quieres')).toContainEqual({ infinitive: 'querer', tense: 'presente', person: 1 })
    expect(findVerbForms('Habló')).toContainEqual({ infinitive: 'hablar', tense: 'preterito', person: 2 })
    expect(findVerbForms('soy')).toContainEqual({ infinitive: 'ser', tense: 'presente', person: 0 })
  })
  it('finds reflexive verbs by the bare form', () => {
    expect(findVerbForms('llamo')).toContainEqual({ infinitive: 'llamarse', tense: 'presente', person: 0 })
  })
  it('returns [] for unknown words', () => {
    expect(findVerbForms('mesa')).toEqual([])
  })
})
