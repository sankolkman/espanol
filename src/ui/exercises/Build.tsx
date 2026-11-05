import { useState } from 'react'
import type { Exercise } from '../../logic/lessonBuilder'
import { checkAnswer } from '../../logic/normalize'
import type { ExerciseProps } from './types'

export function Build({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'build' }>>) {
  /** indexes into ex.tiles, in chosen order */
  const [chosen, setChosen] = useState<number[]>([])
  const toggle = (i: number) => {
    if (locked) return
    setChosen((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))
  }
  return (
    <div>
      <p className="kind">Zet de zin in elkaar</p>
      <div className="prompt">{ex.promptNl}</div>
      <div className="tiles answer-line" aria-label="Jouw zin">
        {chosen.map((i) => (
          <button key={i} className="tile" onClick={() => toggle(i)} disabled={locked}>
            {ex.tiles[i]}
          </button>
        ))}
      </div>
      <div className="tiles">
        {ex.tiles.map((t, i) => (
          <button
            key={i}
            className={`tile ${chosen.includes(i) ? 'used' : ''}`}
            onClick={() => toggle(i)}
            disabled={locked}
            aria-hidden={chosen.includes(i)}
          >
            {t}
          </button>
        ))}
      </div>
      {!locked && (
        <button
          className="btn primary block"
          style={{ marginTop: 18 }}
          disabled={chosen.length === 0}
          onClick={() => {
            const r = checkAnswer(chosen.map((i) => ex.tiles[i]).join(' '), [ex.answer])
            onResult({ verdict: r.verdict, expected: ex.answer })
          }}
        >
          Controleer
        </button>
      )}
    </div>
  )
}
