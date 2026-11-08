import { useState } from 'react'
import type { Exercise } from '../../logic/lessonBuilder'
import { checkAnswer, normalize } from '../../logic/normalize'
import { SpeakButton } from '../SpeakButton'
import { ActionBar } from '../ActionBar'
import type { ExerciseProps } from './types'

export function DialogueFill({ ex, locked, onResult }: ExerciseProps<Extract<Exercise, { kind: 'dialogue' }>>) {
  const d = ex.dialogue
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showNl, setShowNl] = useState(false)
  const gaps = d.turns.map((t, i) => (t.gap ? i : -1)).filter((i) => i >= 0)
  const results = gaps.map((i) => checkAnswer(answers[i] ?? '', [d.turns[i].gap!.answer, ...(d.turns[i].gap!.alt ?? [])]))
  const allFilled = gaps.every((i) => normalize(answers[i] ?? '') !== '')
  const verdictOf = (i: number) => results[gaps.indexOf(i)].verdict

  const submit = () => {
    const verdicts = results.map((r) => r.verdict)
    const verdict = verdicts.includes('wrong') ? 'wrong' : 'correct'
    onResult({ verdict, expected: gaps.map((i) => d.turns[i].gap!.answer).join(' · '), canOverride: true })
  }

  return (
    <div>
      <p className="kind">Gesprek: vul aan</p>
      <h2>{d.title}</h2>
      <button className="btn link" onClick={() => setShowNl((s) => !s)}>
        {showNl ? 'Verberg vertaling' : 'Toon vertaling'}
      </button>
      <div className="turns">
        {d.turns.map((t, i) => {
          const me = t.speaker === 'Tú' || t.speaker === 'Jij'
          const [before, after] = t.es.split('___')
          const full = t.gap ? `${before}${t.gap.answer}${after ?? ''}` : t.es
          return (
            <div key={i} className={`turn ${me ? 'me' : ''}`}>
              <div className="speaker">{t.speaker}</div>
              <div lang="es">
                {t.gap ? (
                  <>
                    {before}
                    {t.gap.options && !locked ? (
                      <select
                        aria-label={`Ontbrekend woord ${gaps.indexOf(i) + 1}`}
                        value={answers[i] ?? ''}
                        onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                      >
                        <option value="">kies…</option>
                        {t.gap.options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        aria-label={`Ontbrekend woord ${gaps.indexOf(i) + 1}`}
                        className={`gap-input ${locked ? (verdictOf(i) === 'wrong' ? 'wrong' : 'right') : ''}`}
                        value={answers[i] ?? ''}
                        readOnly={locked}
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                      />
                    )}
                    {after}
                  </>
                ) : (
                  t.es
                )}{' '}
                {(!t.gap || locked) && <SpeakButton text={full} />}
              </div>
              {(showNl || t.gap) && <div className="tr">{t.nl}</div>}
            </div>
          )
        })}
      </div>
      {!locked && (
        <ActionBar>
          <button className="btn primary block" disabled={!allFilled} onClick={submit}>
            Controleer
          </button>
        </ActionBar>
      )}
    </div>
  )
}
