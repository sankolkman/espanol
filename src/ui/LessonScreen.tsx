import { useState } from 'react'
import { allLessons, lessonById, lessonsBefore, pathById, pathLessons, pathOf, siblingIds, unitOf } from '../content'
import type { Lesson } from '../content/types'
import { buildLesson, buildReviewSession, toPoolItems, type Exercise } from '../logic/lessonBuilder'
import { nextLessonId } from '../logic/progress'
import { ActionBar } from './ActionBar'
import { LessonRunner, type LessonSummary } from './LessonRunner'
import { Markdown } from './markdown'
import { lessonUnlocked } from './paths'
import { go } from './router'
import { useProgress } from './SettingsContext'

const closeTo = (pathId: string) => () => {
  if (confirm('Les stoppen? Je voortgang in deze les gaat verloren.')) go(`#/pad/${pathId}`)
}

export function LessonScreen({ lessonId }: { lessonId: string }) {
  const { progress, update } = useProgress()
  const lesson = lessonById(lessonId)
  const pathId = pathOf(lessonId).id
  const [phase, setPhase] = useState<'intro' | 'run' | 'done'>('intro')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [summary, setSummary] = useState<LessonSummary | null>(null)

  if (!lesson || !lessonUnlocked(progress.completedLessons, lessonId)) {
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

  if (phase === 'run') return <LessonRunner exercises={exercises} onFinish={finish} onClose={closeTo(pathId)} />
  if (phase === 'done' && summary) {
    const next = nextLessonId(siblingIds(lesson.id), [...progress.completedLessons, lesson.id])
    return <LessonDone summary={summary} nextId={next} pathId={pathId} />
  }
  return <LessonIntro lesson={lesson} pathId={pathId} onStart={start} />
}

export function ReviewScreen({ pathId }: { pathId?: string }) {
  const { progress } = useProgress()
  const path = pathById(pathId ?? progress.settings.path)
  const [exercises] = useState(() =>
    buildReviewSession(
      pathLessons(path.id).filter((l) => progress.completedLessons.includes(l.id)),
      progress.items,
      { speech: progress.settings.speechEnabled, seed: Date.now() % 2147483647, now: Date.now() },
    ),
  )
  const [summary, setSummary] = useState<LessonSummary | null>(null)

  if (exercises.length === 0) {
    return (
      <main className="screen">
        <p>Rond eerst een les af, dan kun je herhalen.</p>
        <a className="btn" href={`#/pad/${path.id}`}>
          Terug naar het pad
        </a>
      </main>
    )
  }
  if (summary) return <LessonDone summary={summary} title="Herhaling klaar!" pathId={path.id} />
  return <LessonRunner exercises={exercises} onFinish={setSummary} onClose={closeTo(path.id)} />
}

function LessonIntro({ lesson, pathId, onStart }: { lesson: Lesson; pathId: string; onStart(): void }) {
  const unit = unitOf(lesson.id)
  return (
    <main className="screen has-action-bar">
      <a className="close" href={`#/pad/${pathId}`} aria-label="Terug">
        ←
      </a>
      <p className="eyebrow muted">{unit?.title}</p>
      <h1>{lesson.title}</h1>
      <p>{lesson.intro}</p>
      {lesson.song && (
        <section className="card">
          <h2>🎵 {lesson.song.title}</h2>
          <p className="muted small">
            In deze les leer je woorden die je in dit lied hoort. Luister het lied daarna (of ervoor) en let op de woorden.
          </p>
          <a
            className="btn block"
            target="_blank"
            rel="noreferrer"
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.song.query)}`}
          >
            Zoek het lied op YouTube ↗
          </a>
        </section>
      )}
      {lesson.chapter && (
        <section className="card">
          <h2>Waar gaat het over?</h2>
          <p>{lesson.chapter.summary}</p>
          <a className="btn block" href={`#/lees/${lesson.id}`}>
            📖 Lees {lesson.chapter.bookName} {lesson.chapter.chapter}
          </a>
          <p className="muted small">
            Tik tijdens het lezen op een woord voor de vertaling. Je kunt eerst lezen en dan de les doen, of andersom.
          </p>
        </section>
      )}
      <section className="card">
        <h2>Nieuwe woorden</h2>
        <p lang="es">{lesson.words.map((w) => w.es).join(' · ')}</p>
      </section>
      {lesson.passage && !lesson.chapter && (
        <section className="card">
          <h2>Tekst: {lesson.passage.ref}</h2>
          <p className="muted small">Aan het eind van de les vul je in deze tekst de ontbrekende woorden in.</p>
        </section>
      )}
      {lesson.grammar && (
        <section className="card">
          <h2>Grammatica: {lesson.grammar.title}</h2>
          <Markdown text={lesson.grammar.explanation} />
        </section>
      )}
      <ActionBar>
        <button className="btn primary block" onClick={onStart}>
          Start de les
        </button>
      </ActionBar>
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
    if (l.reading?.id === id) return { es: l.reading.title, nl: 'vragen' }
    if (l.passage?.id === id) return { es: l.passage.ref, nl: 'tekst invullen' }
  }
  return null
}

function LessonDone(props: { summary: LessonSummary; nextId?: string | null; title?: string; pathId: string }) {
  const { correct, total, weakItems } = props.summary
  const pct = total ? Math.round((correct / total) * 100) : 100
  return (
    <main className="screen done-screen has-action-bar">
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
      <ActionBar>
        {props.nextId && (
          <a className="btn primary" href={`#/les/${props.nextId}`}>
            Volgende les
          </a>
        )}
        <a className="btn" href={`#/pad/${props.pathId}`}>
          Terug naar het pad
        </a>
      </ActionBar>
    </main>
  )
}
