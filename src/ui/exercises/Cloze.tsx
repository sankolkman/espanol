import { useMemo, useState } from 'react'
import { clozeVerses } from '../../logic/cloze'
import type { Exercise } from '../../logic/lessonBuilder'
import { normalize } from '../../logic/normalize'
import { SpeakButton } from '../SpeakButton'
import type { ExerciseProps } from './types'

/** Bible passage with gaps; each gap is filled by choosing from the word bank */
export function Cloze({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'cloze' }>>) {
  const p = ex.passage
  const verses = useMemo(() => clozeVerses(p), [p])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showNl, setShowNl] = useState(false)
  const allFilled = p.gaps.every((_, i) => answers[i])
  const right = (i: number) => normalize(answers[i] ?? '') === normalize(p.gaps[i])

  const submit = () =>
    onResult({ verdict: p.gaps.every((_, i) => right(i)) ? 'correct' : 'wrong', expected: p.gaps.join(' · ') })

  return (
    <div>
      <p className="kind">Vul de tekst aan</p>
      <h2>
        {p.title} <span className="muted small">· {p.ref}</span>
      </h2>
      <p className="muted small">Kies bij elk open plekje het juiste woord uit het rijtje.</p>
      <div className="bank" aria-label="Woorden om in te vullen">
        {ex.bank.map((w) => (
          <span key={w} className={`chip ${Object.values(answers).includes(w) ? 'used' : ''}`} lang="es">
            {w}
          </span>
        ))}
      </div>
      <button className="btn link" onClick={() => setShowNl((s) => !s)}>
        {showNl ? 'Verberg vertaling' : 'Toon vertaling'}
      </button>
      <div className="verses">
        {verses.map((segs, vi) => (
          <p key={vi} className="verse">
            <sup className="vref">{p.verses[vi].ref.replace(/^.* /, '')}</sup>{' '}
            <span lang="es">
              {segs.map((s, si) =>
                'text' in s ? (
                  <span key={si}>{s.text}</span>
                ) : (
                  <select
                    key={si}
                    aria-label={`Ontbrekend woord ${s.gap + 1}`}
                    className={`gap-select ${locked ? (right(s.gap) ? 'right' : 'wrong') : ''}`}
                    value={answers[s.gap] ?? ''}
                    disabled={locked}
                    onChange={(e) => setAnswers((a) => ({ ...a, [s.gap]: e.target.value }))}
                  >
                    <option value="">…</option>
                    {ex.bank.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                ),
              )}
            </span>{' '}
            {locked && <SpeakButton text={p.verses[vi].es} />}
            {showNl && <span className="tr">{p.verses[vi].nl}</span>}
          </p>
        ))}
      </div>
      {!locked && (
        <button className="btn primary block" style={{ marginTop: 18 }} disabled={!allFilled} onClick={submit}>
          Controleer
        </button>
      )}
    </div>
  )
}
