import { useMemo, useState } from 'react'
import { allLessons, lessonIds } from '../content'
import { normalize, stripAccents } from '../logic/normalize'
import { isUnlocked } from '../logic/progress'
import { useProgress } from './SettingsContext'
import { SpeakButton } from './SpeakButton'

interface WordLike {
  id: string
  es: string
  nl: string
}

const key = (s: string) => stripAccents(normalize(s))

export function filterWords<T extends WordLike>(words: T[], query: string): T[] {
  const q = key(query)
  if (!q) return words
  return words.filter((w) => key(w.es).includes(q) || key(w.nl).includes(q))
}

export function WordsScreen() {
  const { progress } = useProgress()
  const [query, setQuery] = useState('')
  const words = useMemo(
    () =>
      allLessons
        .filter((l) => isUnlocked(lessonIds, progress.completedLessons, l.id))
        .flatMap((l) => l.words)
        .sort((a, b) => key(a.es.replace(/^(el|la|los|las|un|una) /, '')).localeCompare(key(b.es.replace(/^(el|la|los|las|un|una) /, '')))),
    [progress.completedLessons],
  )
  const shown = filterWords(words, query)
  const itemProgress = progress.items

  return (
    <main className="screen">
      <h1>Woorden</h1>
      <p className="muted small">{words.length} woorden uit je vrijgespeelde lessen.</p>
      <input
        type="search"
        placeholder="Zoek in het Spaans of Nederlands"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="word-list" style={{ marginTop: 12 }}>
        {shown.map((w) => {
          const p = itemProgress[w.id]
          return (
            <li key={w.id}>
              <SpeakButton text={w.es} />
              <div className="grow">
                <div className="es" lang="es">
                  {w.es}
                </div>
                <div className="nl">{w.nl}</div>
              </div>
              {p && (
                <span className="muted small" title="Hoe goed je dit woord kent (1–5)">
                  {'●'.repeat(p.box)}
                  {'○'.repeat(5 - p.box)}
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {shown.length === 0 && <p className="muted">Niets gevonden.</p>}
    </main>
  )
}
