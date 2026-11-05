import { pickReview, updateItem, type ItemProgress } from './srs'
import { mulberry32, shuffle } from './shuffle'

const DAY = 86_400_000

describe('updateItem', () => {
  it('moves a new item to box 2 when correct', () => {
    expect(updateItem(undefined, true, 1000)).toEqual({ box: 2, correct: 1, wrong: 0, lastSeen: 1000 })
  })
  it('moves to box 1 when wrong', () => {
    const p: ItemProgress = { box: 4, correct: 3, wrong: 0, lastSeen: 0 }
    expect(updateItem(p, false, 5)).toEqual({ box: 1, correct: 3, wrong: 1, lastSeen: 5 })
  })
  it('caps at box 5', () => {
    expect(updateItem({ box: 5, correct: 9, wrong: 0, lastSeen: 0 }, true, 1).box).toBe(5)
  })
})

describe('pickReview', () => {
  const now = 100 * DAY
  const progress: Record<string, ItemProgress> = {
    fresh: { box: 5, correct: 5, wrong: 0, lastSeen: now },
    old: { box: 1, correct: 0, wrong: 3, lastSeen: now - 10 * DAY },
    mid: { box: 3, correct: 2, wrong: 1, lastSeen: now - 3 * DAY },
  }
  it('orders by due-ness', () => {
    expect(pickReview(['fresh', 'old', 'mid'], progress, 2, now)).toEqual(['old', 'mid'])
  })
  it('returns fewer when fewer ids', () => {
    expect(pickReview(['fresh'], progress, 5, now)).toEqual(['fresh'])
  })
  it('treats unseen items as due', () => {
    expect(pickReview(['fresh', 'never'], progress, 1, now)).toEqual(['never'])
  })
})

describe('shuffle', () => {
  it('is deterministic per seed and keeps elements', () => {
    const a = shuffle([1, 2, 3, 4, 5], mulberry32(7))
    expect(shuffle([1, 2, 3, 4, 5], mulberry32(7))).toEqual(a)
    expect([...a].sort()).toEqual([1, 2, 3, 4, 5])
  })
})
