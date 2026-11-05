import { useEffect } from 'react'
import type { Exercise } from '../../logic/lessonBuilder'
import { SpeakButton, useSpeak } from '../SpeakButton'
import type { ExerciseProps } from './types'

export function Intro({ ex, onResult }: ExerciseProps<Extract<Exercise, { kind: 'intro' }>>) {
  const { enabled, say } = useSpeak()
  const w = ex.word
  useEffect(() => {
    if (enabled) say(w.es)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w.es])
  return (
    <div>
      <p className="kind">Nieuw woord</p>
      <div className="card intro-card">
        <div className="es">{w.es}</div>
        {w.gender && <div className="gender">{w.gender === 'm' ? 'mannelijk' : 'vrouwelijk'}</div>}
        <div className="nl">{w.nl}</div>
        <div className="row" style={{ justifyContent: 'center', marginTop: 12 }}>
          <SpeakButton text={w.es} />
          <SpeakButton text={w.es} slow label="Langzaam uitspreken" />
        </div>
        {w.example && (
          <div className="example">
            {w.example.es}
            <div className="muted small">{w.example.nl}</div>
          </div>
        )}
      </div>
      <button className="btn primary block" onClick={() => onResult({ verdict: 'info' })}>
        Begrepen
      </button>
    </div>
  )
}
