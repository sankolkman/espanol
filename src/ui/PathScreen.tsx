import { pathLessonIds, lessonById } from '../content'
import { nextLessonId } from '../logic/progress'
import { lessonUnlocked, PathTabs, useCurrentPath } from './paths'
import { useProgress } from './SettingsContext'

export function PathScreen(props: { pathId?: string }) {
  const { progress } = useProgress()
  const path = useCurrentPath(props.pathId)
  const ids = pathLessonIds(path.id)
  const done = progress.completedLessons.filter((id) => ids.includes(id))
  const next = nextLessonId(ids, done)
  const nextLesson = next ? lessonById(next) : undefined
  let n = 0

  return (
    <main className="screen">
      <PathTabs current={path.id} hrefFor={(id) => `#/pad/${id}`} />
      <header className={`hero hero-${path.id}`}>
        <p className="eyebrow">{path.id === 'bijbel' ? 'Palabra de Dios' : '¡Hola!'}</p>
        <h1>{path.subtitle}</h1>
        <p className="muted">
          {done.length} van {ids.length} lessen afgerond
        </p>
        <div className="hero-actions">
          {nextLesson ? (
            <a className="btn primary" href={`#/les/${nextLesson.id}`}>
              Volgende les: {nextLesson.title}
            </a>
          ) : (
            <p className="done-all">¡Enhorabuena! Je hebt alle lessen afgerond.</p>
          )}
          {done.length > 0 ? (
            <a className="btn" href={`#/herhalen/${path.id}`}>
              Herhalen
            </a>
          ) : (
            <button className="btn" disabled>
              Herhalen
            </button>
          )}
        </div>
      </header>

      <ol className="path">
        {path.units.map((unit, ui) => (
          <li key={unit.id} className="unit">
            <h2>
              <span className="unit-no">{ui + 1}</span> {unit.title}
            </h2>
            <ol className="lessons">
              {unit.lessons.map((lesson) => {
                n++
                const completed = done.includes(lesson.id)
                const open = lessonUnlocked(progress.completedLessons, lesson.id)
                const state = completed ? 'done' : open ? 'open' : 'locked'
                const label = (
                  <>
                    <span className="dot" aria-hidden="true">
                      {completed ? '✓' : open ? n : '🔒'}
                    </span>
                    <span className="lesson-text">
                      <span className="lesson-title">{lesson.title}</span>
                      <span className="lesson-sub">
                        {completed ? 'Afgerond · opnieuw doen' : open ? lesson.intro : 'Nog op slot'}
                      </span>
                    </span>
                  </>
                )
                return (
                  <li key={lesson.id} className={`lesson ${state}`}>
                    {open ? (
                      <a href={`#/les/${lesson.id}`}>{label}</a>
                    ) : (
                      <div aria-disabled="true">{label}</div>
                    )}
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ol>
      {path.attribution && <p className="attribution">{path.attribution}</p>}
    </main>
  )
}
