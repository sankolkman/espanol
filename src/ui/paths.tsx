import { useEffect } from 'react'
import { pathById, paths, siblingIds } from '../content'
import { isUnlocked } from '../logic/progress'
import { useProgress } from './SettingsContext'

export function lessonUnlocked(completed: string[], lessonId: string): boolean {
  return isUnlocked(siblingIds(lessonId), completed, lessonId)
}

/** the path to show: the one in the route, else the last opened one; remembers the choice */
export function useCurrentPath(routeId: string | undefined) {
  const { progress, update } = useProgress()
  const path = pathById(routeId ?? progress.settings.path)
  useEffect(() => {
    if (routeId && progress.settings.path !== path.id) {
      update((p) => ({ ...p, settings: { ...p.settings, path: path.id } }))
    }
  }, [routeId, path.id, progress.settings.path, update])
  return path
}

/** tabs to switch between learning paths; hrefFor builds the link per path id */
export function PathTabs(props: { current: string; hrefFor(id: string): string }) {
  return (
    <nav className="path-tabs" aria-label="Kies een leerpad">
      {paths.map((p) => (
        <a key={p.id} href={props.hrefFor(p.id)} className={p.id === props.current ? 'on' : ''} aria-current={p.id === props.current ? 'page' : undefined}>
          {p.title}
        </a>
      ))}
    </nav>
  )
}
