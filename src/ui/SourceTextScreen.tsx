import { useState } from 'react'
import { lessonById, pathOf } from '../content'
import type { Lesson } from '../content/types'
import { loadSongs } from '../logic/lyrics'
import { normalize, stripAccents } from '../logic/normalize'
import { ActionBar } from './ActionBar'
import { lessonUnlocked } from './paths'
import { useProgress } from './SettingsContext'
import { SpeakButton } from './SpeakButton'

/** where the "whole text" button of a lesson goes, or null when the lesson has no source text */
export function sourceTextHref(lesson: Lesson | undefined): string | null {
  if (!lesson) return null
  if (lesson.chapter) return `#/lees/${lesson.id}`
  if (lesson.passage || lesson.song) return `#/tekst/${lesson.id}`
  return null
}

export function SourceTextButton({ lesson }: { lesson: Lesson | undefined }) {
  const href = sourceTextHref(lesson)
  if (!href) return null
  return (
    <a className="btn block" href={href}>
      📖 Bekijk de hele tekst
    </a>
  )
}

const sameTitle = (a: string, b: string) => stripAccents(normalize(a)) === stripAccents(normalize(b))

export function SourceTextScreen({ lessonId }: { lessonId: string }) {
  const { progress } = useProgress()
  const lesson = lessonById(lessonId)
  if (!lesson || !lessonUnlocked(progress.completedLessons, lessonId)) {
    return (
      <main className="screen">
        <p>Deze tekst is nog op slot.</p>
        <a className="btn" href="#/">
          Terug naar het pad
        </a>
      </main>
    )
  }
  return (
    <main className="screen has-action-bar">
      <a className="close" href={`#/les/${lesson.id}`} aria-label="Terug naar de les">
        ←
      </a>
      {lesson.passage ? <PassageText lesson={lesson} /> : lesson.song ? <SongText lesson={lesson} /> : null}
      <ActionBar>
        <a className="btn primary block" href={`#/les/${lesson.id}`}>
          Terug naar de les
        </a>
      </ActionBar>
    </main>
  )
}

function PassageText({ lesson }: { lesson: Lesson }) {
  const p = lesson.passage!
  const [showNl, setShowNl] = useState(true)
  return (
    <>
      <p className="eyebrow muted">{p.title}</p>
      <h1>{p.ref}</h1>
      <button className="btn link" onClick={() => setShowNl((s) => !s)}>
        {showNl ? 'Verberg vertaling' : 'Toon vertaling'}
      </button>
      <div className="verses">
        {p.verses.map((v) => (
          <p key={v.ref} className="verse">
            <sup className="vref">{v.ref.replace(/^.* /, '')}</sup> <span lang="es">{v.es}</span>{' '}
            <SpeakButton text={v.es} label={`${v.ref} voorlezen`} />
            {showNl && <span className="tr">{v.nl}</span>}
          </p>
        ))}
      </div>
      <p className="attribution">{pathOf(lesson.id).attribution}</p>
    </>
  )
}

function SongText({ lesson }: { lesson: Lesson }) {
  const song = lesson.song!
  const own = loadSongs().find((s) => sameTitle(s.title, song.title))
  if (own) {
    return (
      <>
        <p className="eyebrow muted">Jouw tekst</p>
        <h1>{song.title}</h1>
        <div className="song-text" lang="es">
          {own.text.split(/\r?\n/).map((line, i) => (
            <p key={i}>{line || ' '}</p>
          ))}
        </div>
        <a className="btn" href={`#/liedjes/${own.id}`}>
          🎵 Oefen deze tekst
        </a>
        <p className="attribution">Deze tekst heb je zelf toegevoegd; hij staat alleen in deze browser.</p>
      </>
    )
  }
  return (
    <>
      <p className="eyebrow muted">Songtekst</p>
      <h1>{song.title}</h1>
      <p className="notice">
        De tekst van dit lied is auteursrechtelijk beschermd, daarom staat hij niet in de app. Zoek de tekst op, of
        plak een tekst die je hebt in de app. Daarna zie je hem hier, en kun je ermee oefenen.
      </p>
      <div className="row">
        <a
          className="btn"
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/search?q=${encodeURIComponent(`letra ${song.title}`)}`}
        >
          🔎 Zoek de songtekst ↗
        </a>
        <a className="btn primary" href={`#/liedjes/nieuw:${encodeURIComponent(song.title)}`}>
          Plak de tekst in de app
        </a>
      </div>
    </>
  )
}
