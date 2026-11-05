import { allLessons, lessonIds } from '../content'
import { isUnlocked } from '../logic/progress'
import { Markdown } from './markdown'
import { useProgress } from './SettingsContext'

export function GrammarScreen() {
  const { progress } = useProgress()
  const lessons = allLessons.filter((l) => l.grammar && isUnlocked(lessonIds, progress.completedLessons, l.id))
  return (
    <main className="screen">
      <h1>Grammatica</h1>
      <p className="muted small">Uitleg uit je vrijgespeelde lessen. Tik om open te klappen.</p>
      {lessons.length === 0 && <p className="muted">Nog geen grammatica vrijgespeeld.</p>}
      {lessons.map((l) => (
        <details key={l.id} className="card">
          <summary>
            {l.grammar!.title} <span className="muted small">· {l.title}</span>
          </summary>
          <Markdown text={l.grammar!.explanation} />
        </details>
      ))}
    </main>
  )
}
