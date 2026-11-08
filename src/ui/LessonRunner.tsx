import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { Exercise } from '../logic/lessonBuilder'
import { updateItem } from '../logic/srs'
import { recognitionSupported } from '../speech/recognition'
import { ttsSupported } from '../speech/tts'
import { Build } from './exercises/Build'
import { Choice } from './exercises/Choice'
import { Cloze } from './exercises/Cloze'
import { DialogueFill } from './exercises/DialogueFill'
import { GrammarFill } from './exercises/GrammarFill'
import { Intro } from './exercises/Intro'
import { Listen } from './exercises/Listen'
import { ReadingQuiz } from './exercises/ReadingQuiz'
import { Speak } from './exercises/Speak'
import { TypeAnswer } from './exercises/TypeAnswer'
import type { Outcome } from './exercises/types'
import { useProgress } from './SettingsContext'
import { AnswerReview } from './AnswerReview'
import { useSpeak } from './SpeakButton'

export interface LessonSummary {
  correct: number
  total: number
  weakItems: string[]
}

interface Entry {
  ex: Exercise
  retry: boolean
}

export interface SpeechState {
  /** persisted setting */
  speech: boolean
  /** this session only: no speaking (button or microphone denied) */
  noSpeak?: boolean
  /** this session only: no listening */
  noListen?: boolean
}

/** replaces or drops exercises the current settings/browser can't do */
export function adapt(ex: Exercise, s: SpeechState): Exercise | null {
  if (ex.kind === 'listen') return s.speech && !s.noListen && ttsSupported() ? ex : null
  if (ex.kind === 'speak' && (!s.speech || s.noSpeak || !recognitionSupported())) {
    if (ex.context) {
      return { kind: 'type', itemId: ex.itemId, prompt: ex.nl, promptLang: 'nl', accepted: [ex.es], gap: ex.context }
    }
    return { kind: 'type', itemId: ex.itemId, prompt: ex.nl, promptLang: 'nl', accepted: [ex.es, ...(ex.altEs ?? [])] }
  }
  return ex
}

interface Session {
  disableSpeak(): void
  disableListen(): void
}
const SessionContext = createContext<Session>({ disableSpeak() {}, disableListen() {} })
export const useSession = () => useContext(SessionContext)

export function LessonRunner(props: { exercises: Exercise[]; onFinish(s: LessonSummary): void; onClose(): void }) {
  const { progress, update } = useProgress()
  const speechEnabled = progress.settings.speechEnabled
  const [queue, setQueue] = useState<Entry[]>(() => props.exercises.map((ex) => ({ ex, retry: false })))
  const [pos, setPos] = useState(0)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [noSpeak, setNoSpeak] = useState(false)
  const [noListen, setNoListen] = useState(false)
  const session = useMemo<Session>(() => ({ disableSpeak: () => setNoSpeak(true), disableListen: () => setNoListen(true) }), [])
  const stats = useRef({ correct: 0, total: 0, weak: [] as string[] })
  const finished = useRef(false)

  const entry = queue[pos] as Entry | undefined
  const current = useMemo(
    () => (entry ? adapt(entry.ex, { speech: speechEnabled, noSpeak, noListen }) : null),
    [entry, speechEnabled, noSpeak, noListen],
  )

  useEffect(() => {
    if (finished.current) return
    if (!entry) {
      finished.current = true
      const s = stats.current
      props.onFinish({ correct: s.correct, total: s.total, weakItems: s.weak })
    } else if (!current) {
      setPos((p) => p + 1)
    }
  }, [entry, current, props])

  const advance = () => {
    setOutcome(null)
    setPos((p) => p + 1)
  }

  const commit = (right: boolean) => {
    if (!entry) return
    const id = entry.ex.itemId
    const now = Date.now()
    update((p) => ({ ...p, items: { ...p.items, [id]: updateItem(p.items[id], right, now) } }))
    if (!entry.retry) {
      stats.current.total++
      if (right) stats.current.correct++
      else if (!stats.current.weak.includes(id)) stats.current.weak.push(id)
    }
    if (!right) setQueue((q) => [...q, { ex: entry.ex, retry: true }])
    advance()
  }

  const onResult = (o: Outcome) => {
    if (o.verdict === 'info' || o.verdict === 'skipped') advance()
    else setOutcome(o)
  }

  const progressPct = queue.length ? Math.round((pos / queue.length) * 100) : 100

  return (
    <SessionContext.Provider value={session}>
    <div className="runner">
      <div className="lesson-top">
        <button className="close" aria-label="Les stoppen" onClick={props.onClose}>
          ✕
        </button>
        <div className="bar" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
          <div style={{ width: `${progressPct}%` }} />
        </div>
      </div>
      {current && (
        <div className="exercise" key={pos}>
          {entry?.retry && <p className="muted small">Nog een keer:</p>}
          <ExerciseView ex={current} locked={!!outcome} onResult={onResult} />
        </div>
      )}
      {outcome && <Feedback outcome={outcome} onNext={() => commit(outcome.verdict !== 'wrong')} onOverride={() => commit(true)} />}
    </div>
    </SessionContext.Provider>
  )
}

function ExerciseView(props: { ex: Exercise; locked: boolean; onResult(o: Outcome): void }) {
  const { ex, locked, onResult } = props
  switch (ex.kind) {
    case 'intro':
      return <Intro ex={ex} locked={locked} onResult={onResult} />
    case 'choice':
      return <Choice ex={ex} locked={locked} onResult={onResult} />
    case 'type':
      return <TypeAnswer ex={ex} locked={locked} onResult={onResult} />
    case 'build':
      return <Build ex={ex} locked={locked} onResult={onResult} />
    case 'listen':
      return <Listen ex={ex} locked={locked} onResult={onResult} />
    case 'speak':
      return <Speak ex={ex} locked={locked} onResult={onResult} />
    case 'grammar':
      return <GrammarFill ex={ex} locked={locked} onResult={onResult} />
    case 'dialogue':
      return <DialogueFill ex={ex} locked={locked} onResult={onResult} />
    case 'reading':
      return <ReadingQuiz ex={ex} locked={locked} onResult={onResult} />
    case 'cloze':
      return <Cloze ex={ex} locked={locked} onResult={onResult} />
  }
}

function Feedback(props: { outcome: Outcome; onNext(): void; onOverride(): void }) {
  const { verdict, expected, canOverride, given, accepted, lang, audio } = props.outcome
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => ref.current?.focus(), [])
  const { say } = useSpeak()
  const cls = verdict === 'correct' ? 'good' : 'bad'
  const review = given !== undefined && expected !== undefined
  return (
    <div className={`feedback ${cls}`} role="status">
      <div className="feedback-inner">
        {verdict === 'correct' && <div className="verdict">¡Muy bien!</div>}
        {verdict === 'wrong' && (
          <>
            <div className="verdict">Helaas, het juiste antwoord is:</div>
            {!review && <strong>{expected}</strong>}
          </>
        )}
        {review && <AnswerReview given={given} accepted={accepted ?? [expected]} lang={lang ?? 'es'} />}
        {audio && ttsSupported() && (
          <div className="row">
            <button className="btn" onClick={() => say(audio)}>
              🔊 Voorbeeld
            </button>
            <button className="btn" onClick={() => say(audio, true)} aria-label="Langzaam voorbeeld">
              🐢 Langzaam
            </button>
          </div>
        )}
        <button ref={ref} className="btn primary block" onClick={props.onNext}>
          Verder
        </button>
        {verdict === 'wrong' && canOverride && (
          <button className="btn link" onClick={props.onOverride}>
            Ik had het goed
          </button>
        )}
      </div>
    </div>
  )
}
