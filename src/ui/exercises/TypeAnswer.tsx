import type { Exercise } from '../../logic/lessonBuilder'
import { SpeakButton } from '../SpeakButton'
import { TextAnswer } from './TextAnswer'
import type { ExerciseProps } from './types'

export function TypeAnswer({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'type' }>>) {
  const toEs = ex.promptLang === 'nl'
  return (
    <div>
      <p className="kind">{toEs ? 'Vertaal naar het Spaans' : 'Vertaal naar het Nederlands'}</p>
      <div className="prompt">
        {!toEs && <SpeakButton text={ex.prompt} />}
        <span>{ex.prompt}</span>
      </div>
      <TextAnswer accepted={ex.accepted} locked={locked} onResult={onResult} lang={toEs ? 'es' : 'nl'} />
    </div>
  )
}
