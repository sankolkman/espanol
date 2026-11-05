import { pickSpanishVoice, ttsSupported } from './tts'

const v = (name: string, lang: string, voiceURI = name) => ({ name, lang, voiceURI }) as SpeechSynthesisVoice

describe('pickSpanishVoice', () => {
  const voices = [
    v('English', 'en-US'),
    v('Mexican', 'es-MX'),
    v('Helena', 'es-ES'),
    v('Microsoft Elvira Online (Natural) - Spanish (Spain)', 'es-ES'),
  ]
  it('prefers the configured voice', () => {
    expect(pickSpanishVoice(voices, 'Mexican')?.name).toBe('Mexican')
  })
  it('prefers a natural es-ES voice', () => {
    expect(pickSpanishVoice(voices)?.name).toContain('Natural')
  })
  it('falls back to any es-ES voice', () => {
    expect(pickSpanishVoice(voices.slice(0, 3))?.name).toBe('Helena')
  })
  it('falls back to any Spanish voice', () => {
    expect(pickSpanishVoice(voices.slice(0, 2))?.name).toBe('Mexican')
  })
  it('returns null without Spanish voices', () => {
    expect(pickSpanishVoice([v('English', 'en-US')])).toBeNull()
  })
  it('handles underscore lang codes', () => {
    expect(pickSpanishVoice([v('Android', 'es_ES')])?.name).toBe('Android')
  })
})

describe('ttsSupported', () => {
  it('is false in jsdom', () => {
    expect(ttsSupported()).toBe(false)
  })
})

describe('spainVoiceMissing', () => {
  it('is true when only non-Spain Spanish voices exist', async () => {
    const { spainVoiceMissing } = await import('./tts')
    expect(spainVoiceMissing([v('Mexican', 'es-MX')])).toBe(true)
    expect(spainVoiceMissing([v('Helena', 'es-ES')])).toBe(false)
    expect(spainVoiceMissing([])).toBe(true)
  })
})
