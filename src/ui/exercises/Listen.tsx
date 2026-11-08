import { useEffect } from 'react'
import type { Exercise } from '../../logic/lessonBuilder'
import { useSession } from '../LessonRunner'
import { SpeakButton, useSpeak } from '../SpeakButton'
import { TextAnswer } from './TextAnswer'
import type { ExerciseProps } from './types'

export function Listen({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'listen' }>>) {
  const { say } = useSpeak()
  const session = useSession()
  useEffect(() => {
    const t = setTimeout(() => say(ex.es), 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.es])
  const gap = ex.gap
  return (
    <div>
      <p className="kind">{gap ? 'Luister en vul het ontbrekende woord in' : 'Luister en typ wat je hoort'}</p>
      <div className="row" style={{ justifyContent: 'center', alignItems: 'center', margin: '16px 0 20px' }}>
        <SpeakButton text={ex.es} big label="Nog een keer afspelen" />
        <SpeakButton text={ex.es} slow label="Langzaam afspelen" />
      </div>
      {gap && (
        <>
          <p className="prompt listen-gap" lang="es">
            <span>
              {gap.before}
              <span className="gap-mark">{locked ? ex.accepted[0] : '_____'}</span>
              {gap.after}
            </span>
          </p>
          {!locked && (
            <button className="btn link" onClick={() => say(ex.accepted[0], true)}>
              🔊 Alleen het ontbrekende woord
            </button>
          )}
        </>
      )}
      <TextAnswer
        accepted={ex.accepted}
        locked={locked}
        onResult={onResult}
        lang="es"
        audio={ex.es}
        placeholder={gap ? 'Het ontbrekende woord' : undefined}
      />
      {!locked && (
        <button className="btn link block" onClick={session.disableListen}>
          Ik kan nu niet luisteren
        </button>
      )}
    </div>
  )
}
