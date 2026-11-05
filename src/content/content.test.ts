import { allItemIds, allLessons, course } from '.'

describe('course content', () => {
  it('has ~20 lessons in 6 units', () => {
    expect(course).toHaveLength(6)
    expect(allLessons.length).toBeGreaterThanOrEqual(18)
  })

  it('has unique ids', () => {
    const ids: string[] = []
    for (const u of course) ids.push(u.id)
    for (const l of allLessons) {
      ids.push(l.id)
      ids.push(...l.words.map((w) => w.id), ...l.sentences.map((s) => s.id))
      if (l.grammar) ids.push(l.grammar.id, ...l.grammar.items.map((g) => g.id))
      if (l.dialogue) ids.push(l.dialogue.id)
      if (l.reading) ids.push(l.reading.id)
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
    expect(allLessons.slice(1).every((l) => l.dialogue)).toBe(true)
    expect(course.slice(2).flatMap((u) => u.lessons).filter((l) => l.reading).length).toBeGreaterThanOrEqual(6)
  })

  it('grows from ~5 to ~10 new words', () => {
    expect(allLessons[0].words.length).toBeLessThanOrEqual(6)
    expect(allLessons.at(-1)!.words.length).toBeGreaterThanOrEqual(9)
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
  it.each(allLessons.map((l, i) => [l.id, i] as const))('%s: 15–25 exercises, every new item practised', async (_id, i) => {
    const { buildLesson } = await import('../logic/lessonBuilder')
    const lesson = allLessons[i]
    for (const speech of [true, false]) {
      const exs = buildLesson(lesson, allLessons.slice(0, i), {}, { speech, seed: 7, now: 0 })
      const practice = exs.filter((e) => e.kind !== 'intro')
      expect(practice.length).toBeGreaterThanOrEqual(15)
      expect(practice.length).toBeLessThanOrEqual(25)
      for (const x of [...lesson.words, ...lesson.sentences]) {
        expect(practice.some((e) => e.itemId === x.id)).toBe(true)
      }
    }
  })
})
