import type { Lesson, Unit } from './types'
import { unit1 } from './unit1'
import { unit2 } from './unit2'
import { unit3 } from './unit3'
import { unit4 } from './unit4'
import { unit5 } from './unit5'
import { unit6 } from './unit6'

export const course: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6]

export const allLessons: Lesson[] = course.flatMap((u) => u.lessons)
export const lessonIds: string[] = allLessons.map((l) => l.id)

export function lessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id)
}

export function lessonsBefore(id: string): Lesson[] {
  const i = allLessons.findIndex((l) => l.id === id)
  return i < 0 ? [] : allLessons.slice(0, i)
}

export function unitOf(lessonId: string): Unit | undefined {
  return course.find((u) => u.lessons.some((l) => l.id === lessonId))
}

export function allItemIds(): Set<string> {
  const ids = new Set<string>()
  for (const l of allLessons) {
    for (const w of l.words) ids.add(w.id)
    for (const s of l.sentences) ids.add(s.id)
    for (const g of l.grammar?.items ?? []) ids.add(g.id)
    if (l.dialogue) ids.add(l.dialogue.id)
    if (l.reading) ids.add(l.reading.id)
  }
  return ids
}
