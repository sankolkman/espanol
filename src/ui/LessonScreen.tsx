import { useState } from 'react'
import { allLessons, lessonById, lessonIds, lessonsBefore, unitOf } from '../content'
import type { Lesson } from '../content/types'
import { buildLesson, buildReviewSession, toPoolItems, type Exercise } from '../logic/lessonBuilder'
import { isUnlocked, nextLessonId } from '../logic/progress'
import { LessonRunner, type LessonSummary } from './LessonRunner'
import { Markdown } from './markdown'
import { go } from './router'
import { useProgress } from './SettingsContext'

const close = () => {
  if (confirm('Les stoppen? Je voortgang in deze les gaat verloren.')) go('#/')
}

export function LessonScreen({ lessonId }: { lessonId: string }) {
  const { progress, update } = useProgress()
  const lesson = lessonById(lessonId)
  const [phase, setPhase] = useState<'intro' | 'run' | 'done'>('intro')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [summary, setSummary] = useState<LessonSummary | null>(null)

  if (!lesson || !isUnlocked(lessonIds, progress.completedLessons, lessonId)) {
    return (
      <main className="screen">
        <p>Deze les bestaat niet of is nog op slot.</p>
        <a className="btn" href="#/">
          Terug naar het pad
        </a>
      </main>
    )
  }

  const start = () => {
    setExercises(
      buildLesson(lesson, lessonsBefore(lesson.id), progress.items, {
        speech: progress.settings.speechEnabled,
        seed: Date.now() % 2147483647,
        now: Date.now(),
      }),
    )
    setPhase('run')
  }

  const finish = (s: LessonSummary) => {
    setSummary(s)
    setPhase('done')
    update((p) =>
      p.completedLessons.includes(lesson.id) ? p : { ...p, completedLessons: [...p.completedLessons, lesson.id] },
    )
  }

  if (phase === 'run') return <LessonRunner exercises={exercises} onFinish={finish} onClose={close} />
  if (phase === 'done' && summary) {
    const next = nextLessonId(lessonIds, [...progress.completedLessons, lesson.id])
    return <LessonDone summary={summary} nextId={next} />
  }
  return <LessonIntro lesson={lesson} onStart={start} />
}

export function ReviewScreen() {
  const { progress } = useProgress()
  const [exercises] = useState(() =>
    buildReviewSession(
      allLessons.filter((l) => progress.completedLessons.includes(l.id)),
      progress.items,
      { speech: progress.settings.speechEnabled, seed: Date.now() % 2147483647, now: Date.now() },
    ),
  )
  const [summary, setSummary] = useState<LessonSummary | null>(null)

  if (exercises.length === 0) {
    return (
      <main className="screen">
        <p>Rond eerst een les af, dan kun je herhalen.</p>
        <a className="btn" href="#/">
          Terug naar het pad
        </a>
      </main>
    )
  }
  if (summary) return <LessonDone summary={summary} title="Herhaling klaar!" />
  return <LessonRunner exercises={exercises} onFinish={setSummary} onClose={close} />
}

function LessonIntro({ lesson, onStart }: { lesson: Lesson; onStart(): void }) {
  const unit = unitOf(lesson.id)
  return (
    <main className="screen">
      <a className="close" href="#/" aria-label="Terug">
        ←
      </a>
      <p className="eyebrow muted">{unit?.title}</p>
      <h1>{lesson.title}</h1>
      <p>{lesson.intro}</p>
      <section className="card">
        <h2>Nieuwe woorden</h2>
        <p lang="es">{lesson.words.map((w) => w.es).join(' · ')}</p>
      </section>
      {lesson.grammar && (
        <section className="card">
          <h2>Grammatica: {lesson.grammar.title}</h2>
          <Markdown text={lesson.grammar.explanation} />
        </section>
      )}
      <button className="btn primary block" onClick={onStart}>
        Start de les
      </button>
    </main>
  )
}

function lookup(id: string): { es: string; nl: string } | null {
  for (const l of allLessons) {
    const item = toPoolItems(l).find((x) => x.id === id)
    if (item) return item
    const g = l.grammar?.items.find((x) => x.id === id)
    if (g) return { es: g.prompt.replace('___', g.answer), nl: g.nl ?? 'grammatica' }
    if (l.dialogue?.id === id) return { es: l.dialogue.title, nl: 'gesprek' }
    if (l.reading?.id === id) return { es: l.reading.title, nl: 'leestekst' }
  }
  return null
}

function LessonDone(props: { summary: LessonSummary; nextId?: string | null; title?: string }) {
  const { correct, total, weakItems } = props.summary
  const pct = total ? Math.round((correct / total) * 100) : 100
  return (
    <main className="screen done-screen">
      <div className="big" aria-hidden="true">
        {pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}
      </div>
      <h1>{props.title ?? '¡Lección completada!'}</h1>
      <p className="score">
        {correct} van {total} in één keer goed
      </p>
      {weakItems.length > 0 && (
        <section className="card" style={{ textAlign: 'left' }}>
          <h2>Let hierop</h2>
          <ul className="word-list">
            {weakItems.map((id) => {
              const x = lookup(id)
              return x ? (
                <li key={id}>
                  <div className="grow">
                    <div className="es" lang="es">
                      {x.es}
                    </div>
                    <div className="nl">{x.nl}</div>
                  </div>
                </li>
              ) : null
            })}
          </ul>
        </section>
      )}
      <div className="hero-actions">
        {props.nextId && (
          <a className="btn primary" href={`#/les/${props.nextId}`}>
            Volgende les
          </a>
        )}
        <a className="btn" href="#/">
          Terug naar het pad
        </a>
      </div>
    </main>
  )
}
