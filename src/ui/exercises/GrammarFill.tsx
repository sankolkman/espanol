import type { Exercise } from '../../logic/lessonBuilder'
import { TextAnswer } from './TextAnswer'
import type { ExerciseProps } from './types'

export function GrammarFill({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'grammar' }>>) {
  const [before, after] = ex.prompt.split('___')
  return (
    <div>
      <p className="kind">Vul in</p>
      <div className="prompt" lang="es">
        <span>
          {before}
          <span className="muted">____</span>
          {after}
        </span>
      </div>
      {ex.nl && <p className="muted">{ex.nl}</p>}
      <TextAnswer accepted={ex.accepted} locked={locked} onResult={onResult} lang="es" placeholder="Ontbrekend woord" />
    </div>
  )
}
