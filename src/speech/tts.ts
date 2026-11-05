const isSpanish = (v: SpeechSynthesisVoice) => v.lang.toLowerCase().replace('_', '-').startsWith('es')
const isSpain = (v: SpeechSynthesisVoice) => v.lang.toLowerCase().replace('_', '-') === 'es-es'
const isNatural = (v: SpeechSynthesisVoice) => /natural|online/i.test(v.name)

export function pickSpanishVoice(voices: SpeechSynthesisVoice[], preferredURI?: string): SpeechSynthesisVoice | null {
  return (
    (preferredURI && voices.find((v) => v.voiceURI === preferredURI)) ||
    voices.find((v) => isSpain(v) && isNatural(v)) ||
    voices.find(isSpain) ||
    voices.find(isSpanish) ||
    null
  )
}

/** true when no voice from Spain (es-ES) is available */
export function spainVoiceMissing(voices: SpeechSynthesisVoice[]): boolean {
  return !voices.some(isSpain)
}

export function spanishVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return voices.filter(isSpanish)
}

export function ttsSupported(): boolean {
  return typeof globalThis.speechSynthesis !== 'undefined' && typeof globalThis.SpeechSynthesisUtterance !== 'undefined'
}

/** resolves with available voices; waits for voiceschanged up to 1500 ms */
export function getVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!ttsSupported()) return Promise.resolve([])
  const now = speechSynthesis.getVoices()
  if (now.length) return Promise.resolve(now)
  return new Promise((resolve) => {
    const done = () => {
      speechSynthesis.removeEventListener('voiceschanged', done)
      resolve(speechSynthesis.getVoices())
    }
    speechSynthesis.addEventListener('voiceschanged', done)
    setTimeout(done, 1500)
  })
}

let cachedVoices: SpeechSynthesisVoice[] = []
void getVoices().then((v) => (cachedVoices = v))

export function speak(text: string, opts: { voiceURI?: string; rate: number }): void {
  if (!ttsSupported()) return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text.replace(/___/g, '…'))
  u.lang = 'es-ES'
  u.rate = opts.rate
  const voices = cachedVoices.length ? cachedVoices : speechSynthesis.getVoices()
  const voice = pickSpanishVoice(voices, opts.voiceURI)
  if (voice) u.voice = voice
  speechSynthesis.speak(u)
}
