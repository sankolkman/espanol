import { useEffect, useState } from 'react'
import type { Exercise } from '../../logic/lessonBuilder'
import { matchSpeech } from '../../logic/speechMatch'
import { listenOnce, stopListening } from '../../speech/recognition'
import { useSession } from '../LessonRunner'
import { ActionBar } from '../ActionBar'
import { SpeakButton, useSpeak } from '../SpeakButton'
import type { ExerciseProps } from './types'

const MAX_TRIES = 2

export function Speak({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'speak' }>>) {
  const session = useSession()
  const { say } = useSpeak()
  const [listening, setListening] = useState(false)
  const [fails, setFails] = useState(0)
  const [heard, setHeard] = useState<string | null>(null)
  const [problem, setProblem] = useState<string | null>(null)

  useEffect(() => () => stopListening(), [])

  const record = async () => {
    setListening(true)
    setProblem(null)
    const r = await listenOnce()
    setListening(false)
    if (r.ok) {
      if ([ex.es, ...(ex.altEs ?? [])].some((target) => matchSpeech(r.alternatives, target))) {
        onResult({ verdict: 'correct', expected: ex.es, given: r.alternatives[0], lang: 'es', audio: ex.es })
        return
      }
      setHeard(r.alternatives[0])
      setFails((f) => f + 1)
    } else if (r.reason === 'denied' || r.reason === 'unsupported') {
      // microphone unavailable: speak exercises become typing for the rest of this session
      session.disableSpeak()
    } else {
      setProblem('Ik hoorde niets. Probeer het nog eens.')
    }
  }

  const cannotSpeak = () => session.disableSpeak()

  return (
    <div>
      <p className="kind">{ex.context ? 'Zeg het gemarkeerde deel hardop' : 'Zeg het hardop'}</p>
      <div className="prompt">
        <SpeakButton text={ex.es} />
        {ex.context ? (
          <span lang="es" className="in-context">
            {ex.context.before}
            <mark>{ex.es}</mark>
            {ex.context.after}
          </span>
        ) : (
          <span lang="es">{ex.es}</span>
        )}
      </div>
      <p className="muted">{ex.nl}</p>
      {!locked && (
        <>
          <div className="row" style={{ justifyContent: 'center', margin: '24px 0' }}>
            <button
              className="speak-btn big"
              aria-label={listening ? 'Aan het luisteren' : 'Start opnemen'}
              disabled={listening}
              onClick={() => void record()}
            >
              {listening ? '👂' : '🎤'}
            </button>
          </div>
          <p className="muted" style={{ textAlign: 'center' }}>
            {listening ? 'Ik luister…' : 'Tik op de microfoon en spreek de zin uit.'}
          </p>
          {heard && fails > 0 && (
            <div className="notice">
              Ik hoorde: “{heard}”. {fails < MAX_TRIES ? 'Probeer het nog een keer.' : ''}
              <div style={{ marginTop: 8 }}>
                <div className="row">
                  <button className="btn" onClick={() => say(ex.es)}>
                    🔊 Voorbeeld
                  </button>
                  <button className="btn" onClick={() => say(ex.es, true)} aria-label="Langzaam voorbeeld">
                    🐢 Langzaam
                  </button>
                </div>
              </div>
            </div>
          )}
          {problem && <p className="notice">{problem}</p>}
          <ActionBar>
            {fails >= MAX_TRIES && (
              <button className="btn primary block" onClick={() => onResult({ verdict: 'skipped' })}>
                Ga verder
              </button>
            )}
            <button className="btn link block" onClick={cannotSpeak}>
              Ik kan nu niet praten
            </button>
          </ActionBar>
        </>
      )}
    </div>
  )
}
