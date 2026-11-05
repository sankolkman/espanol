import { pathLessons } from '../content'
import { lessonUnlocked, PathTabs, useCurrentPath } from './paths'
import { Markdown } from './markdown'
import { useProgress } from './SettingsContext'

export function GrammarScreen(props: { pathId?: string }) {
  const { progress } = useProgress()
  const path = useCurrentPath(props.pathId)
  const lessons = pathLessons(path.id).filter((l) => l.grammar && lessonUnlocked(progress.completedLessons, l.id))
  return (
    <main className="screen">
      <PathTabs current={path.id} hrefFor={(id) => `#/grammatica/${id}`} />
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
