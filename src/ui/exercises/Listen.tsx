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
  return (
    <div>
      <p className="kind">Luister en typ wat je hoort</p>
      <div className="row" style={{ justifyContent: 'center', alignItems: 'center', margin: '16px 0 24px' }}>
        <SpeakButton text={ex.es} big label="Nog een keer afspelen" />
        <SpeakButton text={ex.es} slow label="Langzaam afspelen" />
      </div>
      <TextAnswer accepted={ex.accepted} locked={locked} onResult={onResult} lang="es" />
      {!locked && (
        <button className="btn link block" onClick={session.disableListen}>
          Ik kan nu niet luisteren
        </button>
      )}
    </div>
  )
}
