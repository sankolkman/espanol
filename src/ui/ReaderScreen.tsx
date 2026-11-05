import { useMemo, useState } from 'react'
import { allWords, lessonById, pathOf } from '../content'
import { chapterVerses, commonWords } from '../content/bible'
import { buildGlossary, lookupWord, tokenize, type GlossEntry } from '../logic/glossary'
import { lessonUnlocked } from './paths'
import { useProgress } from './SettingsContext'
import { SpeakButton } from './SpeakButton'

let glossaryCache: ReturnType<typeof buildGlossary> | null = null
/** Bible lesson words first, then the holiday words, then common small words */
function glossary() {
  glossaryCache ??= buildGlossary([...allWords('bijbel'), ...allWords('vakantie'), ...commonWords])
  return glossaryCache
}

export function ReaderScreen({ lessonId }: { lessonId: string }) {
  const { progress } = useProgress()
  const lesson = lessonById(lessonId)
  const [picked, setPicked] = useState<{ word: string; entry?: GlossEntry } | null>(null)
  const verses = useMemo(
    () => (lesson?.chapter ? chapterVerses(lesson.chapter.book, lesson.chapter.chapter) : []),
    [lesson],
  )
  const pathId = pathOf(lessonId).id

  if (!lesson?.chapter || !lessonUnlocked(progress.completedLessons, lessonId)) {
    return (
      <main className="screen">
        <p>Dit hoofdstuk is nog op slot.</p>
        <a className="btn" href={`#/pad/${pathId}`}>
          Terug naar het pad
        </a>
      </main>
    )
  }

  const c = lesson.chapter
  return (
    <main className="screen reader">
      <a className="close" href={`#/les/${lesson.id}`} aria-label="Terug naar de les">
        ←
      </a>
      <h1>
        {c.bookName} {c.chapter}
      </h1>
      <p className="muted">{c.summary}</p>
      <p className="muted small">Tik op een woord voor de vertaling.</p>
      <div className="chapter" lang="es">
        {verses.map((v) => (
          <p key={v.n} className="verse">
            <sup className="vref">{v.n}</sup>{' '}
            {tokenize(v.es).map((t, i) =>
              t.word ? (
                <button
                  key={i}
                  type="button"
                  className="word"
                  onClick={() => setPicked({ word: t.text, entry: lookupWord(glossary(), t.text) })}
                >
                  {t.text}
                </button>
              ) : (
                <span key={i}>{t.text}</span>
              ),
            )}{' '}
            <SpeakButton text={v.es} label={`Vers ${v.n} voorlezen`} />
          </p>
        ))}
      </div>
      <a className="btn primary block" href={`#/les/${lesson.id}`}>
        Naar de les
      </a>
      <p className="attribution">{pathOf(lessonId).attribution}</p>

      {picked && (
        <div className="word-pop" role="dialog" aria-label={`Vertaling van ${picked.word}`}>
          <div className="word-pop-inner">
            <div className="row" style={{ alignItems: 'center' }}>
              <SpeakButton text={picked.word} />
              <strong lang="es">{picked.word}</strong>
            </div>
            {picked.entry ? (
              <p>
                {picked.entry.es !== picked.word && (
                  <span className="muted" lang="es">
                    ({picked.entry.es}){' '}
                  </span>
                )}
                {picked.entry.nl}
              </p>
            ) : (
              <p className="muted">Dit woord staat nog niet in de woordenlijst van de app.</p>
            )}
            <div className="row">
              {!picked.entry && (
                <a
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://translate.google.com/?sl=es&tl=nl&text=${encodeURIComponent(picked.word)}`}
                >
                  Opzoeken ↗
                </a>
              )}
              <button className="btn" onClick={() => setPicked(null)}>
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
