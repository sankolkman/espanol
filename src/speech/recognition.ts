export type ListenResult =
  | { ok: true; alternatives: string[] }
  | { ok: false; reason: 'unsupported' | 'denied' | 'no-speech' | 'error' }

interface RecognitionLike {
  lang: string
  maxAlternatives: number
  interimResults: boolean
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  abort(): void
}

function ctor(): (new () => RecognitionLike) | undefined {
  const g = globalThis as Record<string, unknown>
  return (g.SpeechRecognition ?? g.webkitSpeechRecognition) as (new () => RecognitionLike) | undefined
}

export function recognitionSupported(): boolean {
  return !!ctor()
}

let active: RecognitionLike | null = null

export function stopListening(): void {
  active?.abort()
  active = null
}

/** listens for one Spanish utterance */
export function listenOnce(): Promise<ListenResult> {
  const C = ctor()
  if (!C) return Promise.resolve({ ok: false, reason: 'unsupported' })
  stopListening()
  return new Promise((resolve) => {
    let settled = false
    let alternatives: string[] = []
    let error: ListenResult | null = null
    const finish = (r: ListenResult) => {
      if (settled) return
      settled = true
      active = null
      resolve(r)
    }
    try {
      const r = new C()
      active = r
      r.lang = 'es-ES'
      r.maxAlternatives = 5
      r.interimResults = false
      r.onresult = (e) => {
        const res = e.results[e.results.length - 1]
        alternatives = Array.from(res, (a) => a.transcript.trim()).filter(Boolean)
      }
      r.onerror = (e) => {
        error = {
          ok: false,
          reason:
            e.error === 'not-allowed' || e.error === 'service-not-allowed'
              ? 'denied'
              : e.error === 'no-speech' || e.error === 'aborted'
                ? 'no-speech'
                : 'error',
        }
      }
      r.onend = () => {
        if (alternatives.length) finish({ ok: true, alternatives })
        else finish(error ?? { ok: false, reason: 'no-speech' })
      }
      r.start()
    } catch {
      finish({ ok: false, reason: 'error' })
    }
  })
}
