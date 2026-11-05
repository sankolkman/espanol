import { useEffect, useRef, useState, type ReactNode } from 'react'
import { checkAnswer, normalize } from '../../logic/normalize'
import type { Outcome } from './types'

/** shared text input + Controleer button for typed answers */
export function TextAnswer(props: {
  accepted: string[]
  locked: boolean
  onResult(o: Outcome): void
  placeholder?: string
  lang?: 'es' | 'nl'
  children?: ReactNode
}) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => ref.current?.focus(), [])
  const empty = normalize(value) === ''
  const submit = () => {
    if (empty || props.locked) return
    const r = checkAnswer(value, props.accepted, { articleOptional: props.lang === 'nl' })
    props.onResult({ verdict: r.verdict, expected: r.expected, canOverride: true })
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      {props.children}
      <input
        ref={ref}
        type="text"
        lang={props.lang}
        value={value}
        readOnly={props.locked}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder={props.placeholder ?? (props.lang === 'nl' ? 'Typ in het Nederlands' : 'Typ in het Spaans')}
        onChange={(e) => setValue(e.target.value)}
      />
      {!props.locked && (
        <button type="submit" className="btn primary block" style={{ marginTop: 18 }} disabled={empty}>
          Controleer
        </button>
      )}
    </form>
  )
}
