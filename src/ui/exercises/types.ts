export type Verdict = 'correct' | 'wrong' | 'skipped' | 'info'

export interface Outcome {
  verdict: Verdict
  /** canonical answer shown in the feedback panel */
  expected?: string
  /** "Ik had het goed" allowed (typed answers) */
  canOverride?: boolean
  /** what the learner answered, for the word-by-word review */
  given?: string
  /** all accepted answers (defaults to [expected]) */
  accepted?: string[]
  /** language of the answer */
  lang?: 'es' | 'nl'
  /** Spanish text for the "Voorbeeld" button */
  audio?: string
}

export interface ExerciseProps<E> {
  ex: E
  /** true after the answer was checked; inputs become read-only */
  locked: boolean
  onResult(o: Outcome): void
}
