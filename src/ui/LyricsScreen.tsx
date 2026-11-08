import { useMemo, useState } from 'react'
import { buildLyricsSession, loadSongs, lyricLines, saveSongs, type UserSong } from '../logic/lyrics'
import { ActionBar } from './ActionBar'
import { LessonRunner, type LessonSummary } from './LessonRunner'
import { go } from './router'
import { useProgress } from './SettingsContext'

export function LyricsScreen({ songId }: { songId?: string }) {
  const [songs, setSongs] = useState<UserSong[]>(() => loadSongs())
  const song = songId ? songs.find((s) => s.id === songId) : undefined
  if (songId) return song ? <Practice song={song} /> : <NotFound />

  const persist = (next: UserSong[]) => {
    setSongs(next)
    saveSongs(next)
  }
  return (
    <main className="screen">
      <a className="close" href="#/pad/muziek" aria-label="Terug">
        ←
      </a>
      <h1>Eigen songteksten</h1>
      <p className="muted">
        Plak een tekst die je hebt, bijvoorbeeld uit je liedbundel. De app haalt herhaalde regels en kopjes als
        "Coro" eruit en maakt oefeningen van de unieke regels.
      </p>
      <p className="notice">Je teksten blijven alleen in deze browser. Ze gaan niet mee naar een server.</p>
      {songs.map((s) => (
        <section key={s.id} className="card">
          <h2>{s.title}</h2>
          <p className="muted small">{lyricLines(s.text).length} unieke regels</p>
          <div className="row">
            <a className="btn primary" href={`#/liedjes/${s.id}`}>
              🎵 Oefen
            </a>
            <button
              className="btn"
              onClick={() => confirm(`"${s.title}" verwijderen?`) && persist(songs.filter((x) => x.id !== s.id))}
            >
              Verwijder
            </button>
          </div>
        </section>
      ))}
      <AddSong onAdd={(s) => persist([...songs, s])} />
    </main>
  )
}

function AddSong({ onAdd }: { onAdd(s: UserSong): void }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const lines = useMemo(() => lyricLines(text), [text])
  const save = () => {
    onAdd({ id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, title: title.trim(), text })
    setTitle('')
    setText('')
  }
  return (
    <section className="card">
      <h2>Tekst toevoegen</h2>
      <label className="field">
        <span>Titel</span>
        <input type="text" aria-label="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="field">
        <span>Songtekst</span>
        <textarea
          aria-label="Songtekst"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Plak hier de tekst, één regel per regel"
        />
      </label>
      {text.trim() && <p className="muted small">{lines.length} unieke regels (herhalingen worden overgeslagen)</p>}
      <button className="btn primary block" disabled={!title.trim() || lines.length < 2} onClick={save}>
        Opslaan
      </button>
    </section>
  )
}

function Practice({ song }: { song: UserSong }) {
  const { progress } = useProgress()
  const [exercises] = useState(() =>
    buildLyricsSession(song, { speech: progress.settings.speechEnabled, seed: Date.now() % 2147483647 }),
  )
  const [summary, setSummary] = useState<LessonSummary | null>(null)
  if (summary) {
    return (
      <main className="screen done-screen has-action-bar">
        <div className="big" aria-hidden="true">
          🎵
        </div>
        <h1>¡Muy bien!</h1>
        <p className="score">
          {summary.correct} van {summary.total} in één keer goed
        </p>
        <ActionBar>
          <a className="btn primary" href={`#/liedjes/${song.id}`} onClick={() => location.reload()}>
            Nog een keer
          </a>
          <a className="btn" href="#/liedjes">
            Terug naar mijn teksten
          </a>
        </ActionBar>
      </main>
    )
  }
  return (
    <LessonRunner
      exercises={exercises}
      onFinish={setSummary}
      onClose={() => confirm('Oefenen stoppen?') && go('#/liedjes')}
    />
  )
}

function NotFound() {
  return (
    <main className="screen">
      <p>Deze tekst staat niet (meer) in deze browser.</p>
      <a className="btn" href="#/liedjes">
        Naar mijn teksten
      </a>
    </main>
  )
}
