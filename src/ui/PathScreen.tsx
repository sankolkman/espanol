import { course, lessonById, lessonIds } from '../content'
import { isUnlocked, nextLessonId } from '../logic/progress'
import { useProgress } from './SettingsContext'

export function PathScreen() {
  const { progress } = useProgress()
  const done = progress.completedLessons
  const next = nextLessonId(lessonIds, done)
  const nextLesson = next ? lessonById(next) : undefined
  let n = 0

  return (
    <main className="screen">
      <header className="hero">
        <p className="eyebrow">¡Hola!</p>
        <h1>Español voor op vakantie</h1>
        <p className="muted">
          {done.length} van {lessonIds.length} lessen afgerond
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
            <a className="btn" href="#/herhalen">
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
        {course.map((unit, ui) => (
          <li key={unit.id} className="unit">
            <h2>
              <span className="unit-no">{ui + 1}</span> {unit.title}
            </h2>
            <ol className="lessons">
              {unit.lessons.map((lesson) => {
                n++
                const completed = done.includes(lesson.id)
                const open = isUnlocked(lessonIds, done, lesson.id)
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
    </main>
  )
}
