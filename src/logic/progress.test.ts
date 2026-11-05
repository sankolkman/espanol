import {
  emptyProgress,
  exportProgress,
  importProgress,
  isUnlocked,
  loadProgress,
  nextLessonId,
  pruneUnknown,
  saveProgress,
  STORAGE_KEY,
} from './progress'

function memoryStorage(): Storage {
  const m = new Map<string, string>()
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => void m.set(k, v),
    removeItem: (k) => void m.delete(k),
    clear: () => m.clear(),
    key: () => null,
    get length() {
      return m.size
    },
  }
}

const throwing = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('blocked')
  },
} as unknown as Storage

describe('progress storage', () => {
  it('has sensible defaults', () => {
    expect(emptyProgress().settings).toEqual({ rate: 1, speechEnabled: true })
  })
  it('round-trips', () => {
    const s = memoryStorage()
    const p = { ...emptyProgress(), completedLessons: ['a'] }
    saveProgress(p, s)
    expect(loadProgress(s)).toEqual(p)
  })
  it('falls back on garbage', () => {
    const s = memoryStorage()
    s.setItem(STORAGE_KEY, '{garbage')
    expect(loadProgress(s)).toEqual(emptyProgress())
  })
  it('falls back on wrong shape', () => {
    const s = memoryStorage()
    s.setItem(STORAGE_KEY, JSON.stringify({ version: 1, completedLessons: 'x' }))
    expect(loadProgress(s)).toEqual(emptyProgress())
  })
  it('survives throwing storage', () => {
    expect(loadProgress(throwing)).toEqual(emptyProgress())
    expect(() => saveProgress(emptyProgress(), throwing)).not.toThrow()
  })
  it('export/import round-trips and rejects junk', () => {
    const p = { ...emptyProgress(), completedLessons: ['x'] }
    expect(importProgress(exportProgress(p))).toEqual(p)
    expect(() => importProgress('{}')).toThrow('Ongeldig bestand')
    expect(() => importProgress('nope')).toThrow('Ongeldig bestand')
  })
})

describe('unlocking', () => {
  const ids = ['a', 'b', 'c']
  it('unlocks the first lesson and each after a completed one', () => {
    expect(isUnlocked(ids, [], 'a')).toBe(true)
    expect(isUnlocked(ids, [], 'b')).toBe(false)
    expect(isUnlocked(ids, ['a'], 'b')).toBe(true)
    expect(isUnlocked(ids, ['a'], 'zzz')).toBe(false)
  })
  it('finds the next lesson', () => {
    expect(nextLessonId(ids, ['a'])).toBe('b')
    expect(nextLessonId(ids, ['a', 'b', 'c'])).toBeNull()
  })
})

describe('pruneUnknown', () => {
  it('drops ids that no longer exist', () => {
    const p = {
      ...emptyProgress(),
      completedLessons: ['a', 'gone'],
      items: {
        w1: { box: 2 as const, correct: 1, wrong: 0, lastSeen: 0 },
        old: { box: 1 as const, correct: 0, wrong: 1, lastSeen: 0 },
      },
    }
    const r = pruneUnknown(p, new Set(['w1']), new Set(['a']))
    expect(r.completedLessons).toEqual(['a'])
    expect(Object.keys(r.items)).toEqual(['w1'])
  })
})

describe('item validation', () => {
  it('drops malformed item progress', () => {
    const s = memoryStorage()
    const good = { box: 2, correct: 1, wrong: 0, lastSeen: 5 }
    s.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...emptyProgress(), items: { a: { ...good, box: 7 }, b: good, c: 'x', d: { ...good, lastSeen: 'nu' } } }),
    )
    expect(loadProgress(s).items).toEqual({ b: good })
  })
})
