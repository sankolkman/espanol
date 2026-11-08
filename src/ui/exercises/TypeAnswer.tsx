import type { Exercise } from '../../logic/lessonBuilder'
import { SpeakButton } from '../SpeakButton'
import { TextAnswer } from './TextAnswer'
import type { ExerciseProps } from './types'

export function TypeAnswer({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'type' }>>) {
  const toEs = ex.promptLang === 'nl'
  const gap = ex.gap
  return (
    <div>
      <p className="kind">{gap ? 'Vul het ontbrekende stuk in' : toEs ? 'Vertaal naar het Spaans' : 'Vertaal naar het Nederlands'}</p>
      <div className="prompt">
        {!toEs && <SpeakButton text={ex.prompt} />}
        <span>{ex.prompt}</span>
      </div>
      {gap && (
        <p className="prompt listen-gap" lang="es">
          <span>
            {gap.before}
            <span className="gap-mark">{locked ? ex.accepted[0] : '_____'}</span>
            {gap.after}
          </span>
        </p>
      )}
      <TextAnswer
        accepted={ex.accepted}
        locked={locked}
        onResult={onResult}
        lang={toEs ? 'es' : 'nl'}
        audio={gap ? `${gap.before}${ex.accepted[0]}${gap.after}` : undefined}
        placeholder={gap ? 'Het ontbrekende stuk' : undefined}
      />
    </div>
  )
}
