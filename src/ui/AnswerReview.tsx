import { useMemo, useState } from 'react'
import { diffAnswer, explainWord, type DiffWord } from '../logic/answerDiff'
import { lookupWord } from '../logic/glossary'
import { normalize } from '../logic/normalize'
import { conjugate, PERSONS, TENSE_LABELS, TENSES, type Tense } from '../logic/verbs'
import { appGlossary } from './glossary'
import { SpeakButton } from './SpeakButton'

/** the correct answer word by word; tap a word for an explanation (and a verb table for verbs) */
export function AnswerReview(props: { given: string; accepted: string[]; lang: 'es' | 'nl' }) {
  const diff = useMemo(() => diffAnswer(props.given, props.accepted), [props.given, props.accepted])
  const firstMistake = diff.words.findIndex((w) => w.status !== 'ok')
  const [selected, setSelected] = useState<number | null>(firstMistake >= 0 ? firstMistake : null)
  const word = selected !== null ? diff.words[selected] : null

  return (
    <div className="review">
      <p className="hint-small">Tik op een woord voor uitleg.</p>
      <div className="review-words" lang={props.lang}>
        {diff.words.map((w, i) => (
          <button
            key={i}
            type="button"
            className={`rw ${w.status} ${selected === i ? 'selected' : ''}`}
            aria-pressed={selected === i}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            {w.expected}
          </button>
        ))}
      </div>
      {diff.extra.length > 0 && (
        <p className="review-extra">
          Niet nodig: {diff.extra.map((x, i) => <s key={i}>{x} </s>)}
        </p>
      )}
      {word && <WordExplain word={word} lang={props.lang} />}
    </div>
  )
}

function WordExplain({ word, lang }: { word: DiffWord; lang: 'es' | 'nl' }) {
  const meaning = lang === 'es' ? lookupWord(appGlossary(), normalize(word.expected)) : undefined
  return (
    <div className="explain" role="note">
      <p>{explainWord(word)}</p>
      {meaning && (
        <p>
          {lang === 'es' && <SpeakButton text={normalize(word.expected)} />}{' '}
          <strong lang="es">{meaning.es}</strong> = {meaning.nl}
        </p>
      )}
      {word.verb && <VerbTable word={word} />}
    </div>
  )
}

function VerbTable({ word }: { word: DiffWord }) {
  const v = word.verb!
  const c = conjugate(v.infinitive)
  if (!c) return null
  const used = new Set<Tense>(['presente', ...v.expected.map((r) => r.tense), ...(v.given ?? []).map((r) => r.tense)])
  const tenses = TENSES.filter((tn) => used.has(tn))
  const isExpected = (tn: Tense, p: number) => v.expected.some((r) => r.tense === tn && r.person === p)
  const isGiven = (tn: Tense, p: number) => (v.given ?? []).some((r) => r.tense === tn && r.person === p)
  return (
    <>
      <p>
        Vervoeging van <strong lang="es">{v.infinitive}</strong>:
      </p>
      <table className="verb-table" lang="es">
        <thead>
          <tr>
            <th></th>
            {tenses.map((tn) => (
              <th key={tn}>{TENSE_LABELS[tn]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERSONS.map((person, p) => (
            <tr key={p}>
              <th>{person}</th>
              {tenses.map((tn) => (
                <td
                  key={tn}
                  className={`${isExpected(tn, p) ? 'is-expected' : ''} ${isGiven(tn, p) ? 'is-given' : ''}`}
                >
                  {c[tn][p]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="hint-small">Groen: de goede vorm. Doorgestreept: wat jij schreef.</p>
    </>
  )
}
