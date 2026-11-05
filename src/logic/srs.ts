export interface ItemProgress {
  box: 1 | 2 | 3 | 4 | 5
  correct: number
  wrong: number
  /** epoch ms */
  lastSeen: number
}

const DAY = 86_400_000
/** review interval in days per box 1..5 */
const INTERVAL_DAYS = [0, 1, 2, 4, 8]

export function updateItem(p: ItemProgress | undefined, correct: boolean, now: number): ItemProgress {
  const base: ItemProgress = p ?? { box: 1, correct: 0, wrong: 0, lastSeen: now }
  return {
    box: correct ? (Math.min(5, base.box + 1) as ItemProgress['box']) : 1,
    correct: base.correct + (correct ? 1 : 0),
    wrong: base.wrong + (correct ? 0 : 1),
    lastSeen: now,
  }
}

/** higher = more due */
export function reviewPriority(p: ItemProgress, now: number): number {
  const intervalMs = Math.max(INTERVAL_DAYS[p.box - 1] * DAY, DAY / 4)
  return (now - p.lastSeen) / intervalMs + p.wrong / (p.correct + 1)
}

export function pickReview(
  ids: string[],
  progress: Record<string, ItemProgress>,
  n: number,
  now: number,
): string[] {
  const score = (id: string) => (progress[id] ? reviewPriority(progress[id], now) : Number.POSITIVE_INFINITY)
  return [...ids].sort((a, b) => score(b) - score(a)).slice(0, n)
}
