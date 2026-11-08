import { useState } from 'react'
import type { Exercise } from '../../logic/lessonBuilder'
import { SpeakButton } from '../SpeakButton'
import { ActionBar } from '../ActionBar'
import type { ExerciseProps } from './types'

export function ReadingQuiz({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'reading' }>>) {
  const r = ex.reading
  const [picked, setPicked] = useState<Record<number, number>>({})
  const allAnswered = r.questions.every((_, i) => picked[i] !== undefined)
  const submit = () => {
    const wrong = r.questions.filter((q, i) => picked[i] !== q.correct)
    onResult({
      verdict: wrong.length ? 'wrong' : 'correct',
      expected: r.questions.map((q) => q.options[q.correct]).join(' · '),
    })
  }
  return (
    <div>
      <p className="kind">Lezen</p>
      <h2>
        {r.title} {r.text && <SpeakButton text={r.text} />}
      </h2>
      {r.text && (
        <div className="reading-text" lang="es">
          {r.text}
        </div>
      )}
      {r.questions.map((q, qi) => (
        <div key={qi}>
          <p className="question">{q.q}</p>
          <div className="options">
            {q.options.map((o, oi) => {
              const cls = locked
                ? oi === q.correct
                  ? 'right'
                  : picked[qi] === oi
                    ? 'wrong'
                    : ''
                : picked[qi] === oi
                  ? 'selected'
                  : ''
              return (
                <button
                  key={oi}
                  className={`btn option ${cls}`}
                  disabled={locked}
                  onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                >
                  {o}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      {!locked && (
        <ActionBar>
          <button className="btn primary block" disabled={!allAnswered} onClick={submit}>
            Controleer
          </button>
        </ActionBar>
      )}
    </div>
  )
}
