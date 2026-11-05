import { useEffect, useRef, useState } from 'react'
import { emptyProgress, exportProgress, importProgress } from '../logic/progress'
import { recognitionSupported } from '../speech/recognition'
import { getVoices, pickSpanishVoice, spainVoiceMissing, speak, spanishVoices, ttsSupported } from '../speech/tts'
import { useProgress } from './SettingsContext'

export function SettingsScreen() {
  const { progress, update } = useProgress()
  const s = progress.settings
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | null>(null)
  const [message, setMessage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    void getVoices().then((v) => setVoices(spanishVoices(v)))
  }, [])

  const current = voices ? pickSpanishVoice(voices, s.voiceURI) : null
  const setSettings = (patch: Partial<typeof s>) => update((p) => ({ ...p, settings: { ...p.settings, ...patch } }))

  const download = () => {
    const blob = new Blob([exportProgress(progress)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `espanol-voortgang-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const onImport = async (file: File | undefined) => {
    if (!file) return
    try {
      const p = importProgress(await file.text())
      update(() => p)
      setMessage('Voortgang geïmporteerd.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Ongeldig bestand')
    }
    if (fileRef.current) fileRef.current.value = ''
  }

  const wipe = () => {
    if (confirm('Weet je zeker dat je al je voortgang wilt wissen?')) {
      update(() => ({ ...emptyProgress(), settings: progress.settings }))
      setMessage('Voortgang gewist.')
    }
  }

  return (
    <main className="screen">
      <h1>Instellingen</h1>

      <section className="card">
        <h2>Stem</h2>
        {!ttsSupported() ? (
          <p className="notice">Deze browser kan geen tekst uitspreken. Gebruik Chrome of Edge.</p>
        ) : voices === null ? (
          <p className="muted">Stemmen laden…</p>
        ) : voices.length === 0 ? (
          <p className="notice">
            Geen Spaanse stem gevonden. De app probeert toch Spaans uit te spreken, maar het kan raar klinken.
            Installeer een Spaanse stem in je systeem, of gebruik Edge (die heeft natuurlijke stemmen).
          </p>
        ) : (
          <label className="field">
            {spainVoiceMissing(voices) && (
              <span className="notice">
                Geen stem uit Spanje gevonden. Er wordt een andere Spaanse stem gebruikt, die klinkt iets anders. Edge
                heeft wel stemmen uit Spanje.
              </span>
            )}
            <span>Spaanse stem</span>
            <select value={current?.voiceURI ?? ''} onChange={(e) => setSettings({ voiceURI: e.target.value })}>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="field">
          <span>Spreeksnelheid</span>
          <div className="segmented">
            <button className={s.rate === 1 ? 'on' : ''} onClick={() => setSettings({ rate: 1 })}>
              Normaal
            </button>
            <button className={s.rate === 0.75 ? 'on' : ''} onClick={() => setSettings({ rate: 0.75 })}>
              Langzaam
            </button>
          </div>
        </div>
        <button className="btn" onClick={() => speak('Hola, ¿qué tal? Me llamo Lucía.', { voiceURI: s.voiceURI, rate: s.rate })}>
          🔊 Test de stem
        </button>
      </section>

      <section className="card">
        <h2>Luisteren en spreken</h2>
        <label className="toggle">
          <input
            type="checkbox"
            checked={s.speechEnabled}
            onChange={(e) => setSettings({ speechEnabled: e.target.checked })}
          />
          <span>Luister- en spreekoefeningen</span>
        </label>
        <p className="muted small">Zet dit uit als je even stil wilt oefenen, bijvoorbeeld in de trein.</p>
        {!recognitionSupported() && (
          <p className="notice">
            Deze browser ondersteunt geen spraakherkenning. Spreekoefeningen worden vervangen door typen. Gebruik Chrome
            of Edge om hardop te oefenen.
          </p>
        )}
      </section>

      <section className="card">
        <h2>Voortgang</h2>
        <p className="muted small">
          Je voortgang wordt alleen in deze browser bewaard. Met exporteren en importeren zet je hem over naar een ander
          apparaat.
        </p>
        <div className="row">
          <button className="btn" onClick={download}>
            Exporteren
          </button>
          <button className="btn" onClick={() => fileRef.current?.click()}>
            Importeren
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => void onImport(e.target.files?.[0])}
          />
        </div>
        <button className="btn danger" onClick={wipe}>
          Voortgang wissen
        </button>
        {message && <p className="message">{message}</p>}
      </section>
    </main>
  )
}
