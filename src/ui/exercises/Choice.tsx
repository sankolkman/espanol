import { useState } from 'react'
import type { Exercise } from '../../logic/lessonBuilder'
import { SpeakButton } from '../SpeakButton'
import type { ExerciseProps } from './types'

export function Choice({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'choice' }>>) {
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <div>
      <p className="kind">{ex.promptLang === 'es' ? 'Wat betekent dit?' : 'Hoe zeg je dit in het Spaans?'}</p>
      <div className="prompt">
        {ex.promptLang === 'es' && <SpeakButton text={ex.prompt} />}
        <span>{ex.prompt}</span>
      </div>
      <div className="options">
        {ex.options.map((o) => {
          const cls = locked ? (o === ex.answer ? 'right' : o === picked ? 'wrong' : '') : o === picked ? 'selected' : ''
          return (
            <button key={o} className={`btn option ${cls}`} disabled={locked} onClick={() => setPicked(o)}>
              {o}
            </button>
          )
        })}
      </div>
      {!locked && (
        <button
          className="btn primary block"
          style={{ marginTop: 18 }}
          disabled={!picked}
          onClick={() => onResult({ verdict: picked === ex.answer ? 'correct' : 'wrong', expected: ex.answer })}
        >
          Controleer
        </button>
      )}
    </div>
  )
}
