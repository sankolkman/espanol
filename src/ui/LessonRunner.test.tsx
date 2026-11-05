import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Exercise } from '../logic/lessonBuilder'
import { emptyProgress } from '../logic/progress'
import { adapt, LessonRunner } from './LessonRunner'
import { ProgressProvider, useProgress } from './SettingsContext'

const choice: Exercise = {
  kind: 'choice',
  itemId: 'w-hola',
  prompt: 'hola',
  promptLang: 'es',
  options: ['hallo', 'dag', 'ja', 'nee'],
  answer: 'hallo',
}
const typeGracias: Exercise = { kind: 'type', itemId: 'w-gracias', prompt: 'dank je', promptLang: 'nl', accepted: ['gracias'] }
const typeSi: Exercise = { kind: 'type', itemId: 'w-si', prompt: 'ja', promptLang: 'nl', accepted: ['sí'] }

function setup(exercises: Exercise[]) {
  const onFinish = vi.fn()
  const user = userEvent.setup()
  render(
    <ProgressProvider initial={{ ...emptyProgress(), settings: { rate: 1, speechEnabled: false } }}>
      <LessonRunner exercises={exercises} onFinish={onFinish} onClose={() => {}} />
    </ProgressProvider>,
  )
  return { onFinish, user }
}

const check = () => screen.getByRole('button', { name: 'Controleer' })
const next = () => screen.getByRole('button', { name: 'Verder' })
const input = () => screen.getByRole('textbox')

describe('LessonRunner', () => {
  it('disables Controleer while the answer is empty', async () => {
    const { user } = setup([typeGracias])
    expect(check()).toBeDisabled()
    await user.type(input(), '   ')
    expect(check()).toBeDisabled()
    await user.type(input(), 'g')
    expect(check()).toBeEnabled()
  })

  it('lets you override a wrong typed answer', async () => {
    const { user, onFinish } = setup([typeGracias])
    await user.type(input(), 'grazias')
    await user.click(check())
    expect(screen.getByText('gracias')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Ik had het goed' }))
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledWith({ correct: 1, total: 1, weakItems: [] })
  })

  it('repeats wrong answers at the end until correct', async () => {
    const { user, onFinish } = setup([choice, typeGracias, typeSi])
    await user.click(screen.getByRole('button', { name: 'hallo' }))
    await user.click(check())
    await user.click(next())
    await user.type(input(), 'adiós')
    await user.click(check())
    await user.click(next())
    expect(screen.getByText('ja')).toBeInTheDocument()
    await user.type(input(), 'sí')
    await user.click(check())
    await user.click(next())
    expect(onFinish).not.toHaveBeenCalled()
    expect(screen.getByText('dank je')).toBeInTheDocument()
    await user.type(input(), 'gracias')
    await user.click(check())
    await user.click(next())
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledWith({ correct: 2, total: 3, weakItems: ['w-gracias'] })
  })

  it('accepts a missing accent without a spelling note', async () => {
    const { user, onFinish } = setup([typeSi])
    await user.type(input(), 'si')
    await user.click(check())
    expect(screen.getByText('¡Muy bien!')).toBeInTheDocument()
    expect(screen.queryByText(/spelling/)).toBeNull()
    await user.click(next())
    expect(onFinish).toHaveBeenCalledWith({ correct: 1, total: 1, weakItems: [] })
  })

  it('skips listen exercises when speech is off', async () => {
    const listen: Exercise = { kind: 'listen', itemId: 'x', es: 'hola', accepted: ['hola'] }
    const { onFinish } = setup([listen])
    expect(onFinish).toHaveBeenCalledWith({ correct: 0, total: 0, weakItems: [] })
  })
})

function SpeechSettingProbe() {
  const { progress } = useProgress()
  return <span data-testid="speech">{String(progress.settings.speechEnabled)}</span>
}

function setupSpeech(exercises: Exercise[]) {
  const onFinish = vi.fn()
  const user = userEvent.setup()
  render(
    <ProgressProvider initial={emptyProgress()}>
      <LessonRunner exercises={exercises} onFinish={onFinish} onClose={() => {}} />
      <SpeechSettingProbe />
    </ProgressProvider>,
  )
  return { onFinish, user }
}

class DeniedRecognition {
  lang = ''
  maxAlternatives = 1
  interimResults = false
  onresult = null
  onerror: ((e: { error: string }) => void) | null = null
  onend: (() => void) | null = null
  start() {
    queueMicrotask(() => {
      this.onerror?.({ error: 'not-allowed' })
      this.onend?.()
    })
  }
  abort() {}
}

describe('LessonRunner speech fallbacks', () => {
  const g = globalThis as Record<string, unknown>
  beforeEach(() => {
    g.speechSynthesis = { cancel() {}, speak() {}, getVoices: () => [], addEventListener() {}, removeEventListener() {} }
    g.SpeechSynthesisUtterance = class {}
    g.webkitSpeechRecognition = DeniedRecognition
  })
  afterEach(() => {
    delete g.speechSynthesis
    delete g.SpeechSynthesisUtterance
    delete g.webkitSpeechRecognition
  })

  const speak: Exercise = { kind: 'speak', itemId: 'sp', es: 'Soy holandés.', nl: 'Ik ben Nederlander.', altEs: ['Soy holandesa.'] }
  const listen: Exercise = { kind: 'listen', itemId: 'li', es: 'hola', accepted: ['hola'] }

  it('turns speaking into typing when the microphone is denied', async () => {
    const { user, onFinish } = setupSpeech([speak])
    await user.click(screen.getByRole('button', { name: 'Start opnemen' }))
    await user.type(await screen.findByRole('textbox'), 'Soy holandesa')
    await user.click(check())
    await user.click(next())
    expect(onFinish).toHaveBeenCalledWith({ correct: 1, total: 1, weakItems: [] })
  })

  it('"Ik kan nu niet praten" switches to typing for this session only', async () => {
    const { user } = setupSpeech([speak])
    await user.click(screen.getByRole('button', { name: 'Ik kan nu niet praten' }))
    expect(await screen.findByRole('textbox')).toBeInTheDocument()
    expect(screen.getByTestId('speech')).toHaveTextContent('true')
  })

  it('"Ik kan nu niet luisteren" skips listening for this session only', async () => {
    const { user, onFinish } = setupSpeech([listen, { ...listen, itemId: 'li2' }])
    await user.click(screen.getByRole('button', { name: 'Ik kan nu niet luisteren' }))
    expect(onFinish).toHaveBeenCalledWith({ correct: 0, total: 0, weakItems: [] })
    expect(screen.getByTestId('speech')).toHaveTextContent('true')
  })
})

describe('adapt', () => {
  it('keeps alternatives when speaking becomes typing', () => {
    const r = adapt({ kind: 'speak', itemId: 'x', es: 'Estoy enfermo.', nl: 'Ik ben ziek.', altEs: ['Estoy enferma.'] }, { speech: false })
    expect(r).toEqual({ kind: 'type', itemId: 'x', prompt: 'Ik ben ziek.', promptLang: 'nl', accepted: ['Estoy enfermo.', 'Estoy enferma.'] })
  })
})

describe('typing edge cases', () => {
  it('treats punctuation-only input as empty', async () => {
    const { user } = setup([typeGracias])
    await user.type(input(), '?')
    expect(check()).toBeDisabled()
  })

  it('accepts Dutch answers without article', async () => {
    const { user, onFinish } = setup([{ kind: 'type', itemId: 'k', prompt: 'el café', promptLang: 'es', accepted: ['de koffie'] }])
    await user.type(input(), 'koffie')
    await user.click(check())
    await user.click(next())
    expect(onFinish).toHaveBeenCalledWith({ correct: 1, total: 1, weakItems: [] })
  })

  it('shows the translation of dialogue turns with a gap', () => {
    setup([
      {
        kind: 'dialogue',
        itemId: 'd',
        dialogue: {
          id: 'd',
          title: 'Bar',
          turns: [
            { speaker: 'Camarero', es: '¿Qué te pongo?', nl: 'Wat mag het zijn?' },
            { speaker: 'Tú', es: 'Un ___, por favor.', nl: 'Een koffie, alsjeblieft.', gap: { answer: 'café' } },
          ],
        },
      },
    ])
    expect(screen.getByText('Een koffie, alsjeblieft.')).toBeInTheDocument()
    expect(screen.queryByText('Wat mag het zijn?')).toBeNull()
  })
})

describe('cloze exercise', () => {
  const cloze: Exercise = {
    kind: 'cloze',
    itemId: 'p',
    bank: ['reino', 'pan', 'luz'],
    passage: {
      id: 'p',
      title: 'Padre nuestro',
      ref: 'Mateo 6:10-11',
      verses: [
        { ref: 'Mateo 6:10', es: 'Venga tu reino.', nl: 'Uw koninkrijk kome.' },
        { ref: 'Mateo 6:11', es: 'El pan nuestro de cada día, dánoslo hoy.', nl: 'Geef ons vandaag ons dagelijks brood.' },
      ],
      gaps: ['reino', 'pan'],
    },
  }

  it('fills gaps from the word bank and checks them', async () => {
    const { user, onFinish } = setup([cloze])
    expect(check()).toBeDisabled()
    await user.selectOptions(screen.getByRole('combobox', { name: 'Ontbrekend woord 1' }), 'reino')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Ontbrekend woord 2' }), 'pan')
    await user.click(check())
    await user.click(next())
    expect(onFinish).toHaveBeenCalledWith({ correct: 1, total: 1, weakItems: [] })
  })

  it('marks a wrong choice and shows the answers', async () => {
    const { user } = setup([cloze])
    await user.selectOptions(screen.getByRole('combobox', { name: 'Ontbrekend woord 1' }), 'luz')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Ontbrekend woord 2' }), 'pan')
    await user.click(check())
    expect(screen.getByText('reino · pan')).toBeInTheDocument()
  })
})
