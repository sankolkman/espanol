export type Verdict = 'correct' | 'wrong' | 'skipped' | 'info'

export interface Outcome {
  verdict: Verdict
  /** canonical answer shown in the feedback panel */
  expected?: string
  /** "Ik had het goed" allowed (typed answers) */
  canOverride?: boolean
}

export interface ExerciseProps<E> {
  ex: E
  /** true after the answer was checked; inputs become read-only */
  locked: boolean
  onResult(o: Outcome): void
}
