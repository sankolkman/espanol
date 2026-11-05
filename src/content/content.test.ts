import { allItemIds, allLessons, course, lessonsBefore, pathLessons, paths } from '.'
import { chapterVerses } from './bible'
import { clozeVerses } from '../logic/cloze'

const holiday = pathLessons('vakantie')
const bible = pathLessons('bijbel')

describe('holiday course content', () => {
  it('has ~20 lessons in 6 units', () => {
    expect(course).toHaveLength(6)
    expect(holiday.length).toBeGreaterThanOrEqual(18)
  })

  it('has unique ids', () => {
    const ids: string[] = []
    for (const u of paths.flatMap((x) => x.units)) ids.push(u.id)
    for (const l of allLessons) {
      ids.push(l.id)
      ids.push(...l.words.map((w) => w.id), ...l.sentences.map((s) => s.id))
      if (l.grammar) ids.push(l.grammar.id, ...l.grammar.items.map((g) => g.id))
      if (l.dialogue) ids.push(l.dialogue.id)
      if (l.reading) ids.push(l.reading.id)
      if (l.passage) ids.push(l.passage.id)
    }
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(dupes).toEqual([])
    expect(allItemIds().size).toBeGreaterThan(200)
  })

  it.each(allLessons.map((l) => [l.id, l] as const))('%s is well-formed', (_id, l) => {
    expect(l.title.length).toBeGreaterThan(0)
    expect(l.intro.length).toBeGreaterThan(0)
    expect(l.words.length).toBeGreaterThanOrEqual(5)
    expect(l.words.length).toBeLessThanOrEqual(10)
    expect(l.sentences.length).toBeGreaterThanOrEqual(2)
    for (const x of [...l.words, ...l.sentences]) {
      expect(x.es.trim()).toBe(x.es)
      expect(x.nl.trim().length).toBeGreaterThan(0)
    }
    for (const g of l.grammar?.items ?? []) {
      expect(g.prompt.split('___')).toHaveLength(2)
      expect(g.answer.trim().length).toBeGreaterThan(0)
    }
    for (const t of l.dialogue?.turns ?? []) {
      if (t.gap) {
        expect(t.es.split('___')).toHaveLength(2)
        if (t.gap.options) expect(t.gap.options).toContain(t.gap.answer)
      } else {
        expect(t.es).not.toContain('___')
      }
    }
    for (const q of l.reading?.questions ?? []) {
      expect(q.correct).toBeGreaterThanOrEqual(0)
      expect(q.correct).toBeLessThan(q.options.length)
    }
  })

  it('has dialogues from lesson 2 on and readings from unit 3 on', () => {
    expect(holiday.slice(1).every((l) => l.dialogue)).toBe(true)
    expect(course.slice(2).flatMap((u) => u.lessons).filter((l) => l.reading).length).toBeGreaterThanOrEqual(6)
  })

  it('grows from ~5 to ~10 new words', () => {
    expect(holiday[0].words.length).toBeLessThanOrEqual(6)
    expect(holiday.at(-1)!.words.length).toBeGreaterThanOrEqual(9)
  })
})

describe('grammar explanations render cleanly', () => {
  it.each(allLessons.filter((l) => l.grammar).map((l) => [l.id, l.grammar!.explanation] as const))(
    '%s has no stray markdown',
    async (_id, text) => {
      const { render } = await import('@testing-library/react')
      const { createElement } = await import('react')
      const { Markdown } = await import('../ui/markdown')
      const { container } = render(createElement(Markdown, { text }))
      expect(container.textContent).not.toContain('*')
    },
  )
})

describe('real lessons build well', () => {
  it.each(allLessons.map((l) => [l.id, l] as const))('%s: 15–25 exercises, every new item practised', async (_id, lesson) => {
    const { buildLesson } = await import('../logic/lessonBuilder')
    for (const speech of [true, false]) {
      const exs = buildLesson(lesson, lessonsBefore(lesson.id), {}, { speech, seed: 7, now: 0 })
      const practice = exs.filter((e) => e.kind !== 'intro')
      expect(practice.length).toBeGreaterThanOrEqual(15)
      expect(practice.length).toBeLessThanOrEqual(25)
      for (const x of [...lesson.words, ...lesson.sentences]) {
        expect(practice.some((e) => e.itemId === x.id)).toBe(true)
      }
    }
  })
})

describe('bible path content', () => {
  it('has three phases: known passages, stories and all 16 chapters of Mark', () => {
    expect(bible.filter((l) => l.id.startsWith('b1')).length).toBeGreaterThanOrEqual(5)
    expect(bible.filter((l) => l.id.startsWith('b2')).length).toBeGreaterThanOrEqual(5)
    expect(bible.filter((l) => l.chapter?.book === 'MAR').map((l) => l.chapter!.chapter)).toEqual(
      Array.from({ length: 16 }, (_, i) => i + 1),
    )
  })

  it.each(bible.map((l) => [l.id, l] as const))('%s has a passage whose gaps are all in the text', (_id, l) => {
    expect(l.passage).toBeDefined()
    const p = l.passage!
    expect(p.gaps.length).toBeGreaterThanOrEqual(4)
    expect(() => clozeVerses(p)).not.toThrow()
    for (const v of p.verses) {
      expect(v.es.length).toBeGreaterThan(0)
      expect(v.es).not.toMatch(/[[]]/)
      expect(v.nl.trim().length).toBeGreaterThan(0)
    }
  })

  it('has every verse of every Mark chapter', () => {
    // this translation leaves out 7:16, 9:44, 9:46, 11:26, 15:28 and ends Mark at 16:8 (oldest manuscripts)
    const lengths = [45, 28, 35, 41, 43, 56, 36, 38, 48, 52, 32, 44, 37, 72, 46, 8]
    lengths.forEach((n, i) => expect(chapterVerses('MAR', i + 1)).toHaveLength(n))
  })

  it('Mark lessons have a summary and three questions', () => {
    for (const l of bible.filter((x) => x.chapter)) {
      expect(l.chapter!.summary.length).toBeGreaterThan(40)
      expect(l.reading?.questions).toHaveLength(3)
    }
  })
})

describe('progress is kept across content updates', () => {
  it('every lesson and item id from the published version still exists with the same text', async () => {
    const fixture: Record<string, string> = (await import('./progress-ids.fixture.json')).default
    const now: Record<string, string> = {}
    for (const l of allLessons) {
      now[l.id] = l.title
      for (const w of l.words) now[w.id] = w.es
      for (const s of l.sentences) now[s.id] = s.es
      for (const g of l.grammar?.items ?? []) now[g.id] = g.prompt
      if (l.dialogue) now[l.dialogue.id] = l.dialogue.title
      if (l.reading) now[l.reading.id] = l.reading.title
      if (l.passage) now[l.passage.id] = l.passage.ref
    }
    const changed = Object.entries(fixture).filter(([id, text]) => now[id] !== text)
    expect(changed).toEqual([])
  })

  it('keeps the lesson order of each path', async () => {
    const fixture: Record<string, string> = (await import('./progress-ids.fixture.json')).default
    const lessonIdsBefore = Object.keys(fixture).filter((id) => /^(u\d+l\d+|b\d+l\d+)$/.test(id))
    const lessonIdsNow = allLessons.map((l) => l.id)
    expect(lessonIdsNow.slice(0, lessonIdsBefore.length)).toEqual(lessonIdsBefore)
  })
})

describe('short well-known sayings in phase 1 and 2', () => {
  const short = (es: string) => es.split(/\s+/).length <= 8
  it.each(bible.filter((l) => /^b[12]/.test(l.id)).map((l) => [l.id, l] as const))(
    '%s has at least 3 short sayings with a reference',
    (_id, l) => {
      const sayings = l.sentences.filter((s) => short(s.es) && /\(\d? ?[A-Z][a-z]+ \d+:\d+\)$/.test(s.nl))
      expect(sayings.length).toBeGreaterThanOrEqual(3)
    },
  )
})
