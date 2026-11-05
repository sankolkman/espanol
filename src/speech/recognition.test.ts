import { listenOnce, recognitionSupported } from './recognition'

afterEach(() => {
  delete (globalThis as Record<string, unknown>).webkitSpeechRecognition
})

class FakeRecognition {
  static behaviour: (r: FakeRecognition) => void = () => {}
  lang = ''
  maxAlternatives = 1
  interimResults = true
  onresult: ((e: unknown) => void) | null = null
  onerror: ((e: { error: string }) => void) | null = null
  onend: (() => void) | null = null
  start() {
    queueMicrotask(() => FakeRecognition.behaviour(this))
  }
  abort() {}
  stop() {}
}

describe('recognition', () => {
  it('is unsupported in jsdom', async () => {
    expect(recognitionSupported()).toBe(false)
    expect(await listenOnce()).toEqual({ ok: false, reason: 'unsupported' })
  })

  it('maps not-allowed to denied', async () => {
    ;(globalThis as Record<string, unknown>).webkitSpeechRecognition = FakeRecognition
    FakeRecognition.behaviour = (r) => {
      r.onerror?.({ error: 'not-allowed' })
      r.onend?.()
    }
    expect(await listenOnce()).toEqual({ ok: false, reason: 'denied' })
  })

  it('returns alternatives in es-ES', async () => {
    ;(globalThis as Record<string, unknown>).webkitSpeechRecognition = FakeRecognition
    let lang = ''
    FakeRecognition.behaviour = (r) => {
      lang = r.lang
      const result = Object.assign([{ transcript: 'hola' }, { transcript: 'ola' }], { isFinal: true })
      r.onresult?.({ results: [result] })
      r.onend?.()
    }
    expect(await listenOnce()).toEqual({ ok: true, alternatives: ['hola', 'ola'] })
    expect(lang).toBe('es-ES')
  })

  it('reports no-speech when it ends without a result', async () => {
    ;(globalThis as Record<string, unknown>).webkitSpeechRecognition = FakeRecognition
    FakeRecognition.behaviour = (r) => r.onend?.()
    expect(await listenOnce()).toEqual({ ok: false, reason: 'no-speech' })
  })
})
