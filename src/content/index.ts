import { bibleUnits, BIBLE_ATTRIBUTION } from './bible'
import { musicUnit } from './music'
import type { Lesson, Path, Unit, Word } from './types'
import { unit1 } from './unit1'
import { unit2 } from './unit2'
import { unit3 } from './unit3'
import { unit4 } from './unit4'
import { unit5 } from './unit5'
import { unit6 } from './unit6'

/** the holiday path */
export const course: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6]

export const paths: Path[] = [
  { id: 'vakantie', title: 'Vakantie', subtitle: 'Español voor op vakantie', units: course },
  {
    id: 'bijbel',
    title: 'Bijbel',
    subtitle: 'Het Nieuwe Testament lezen',
    units: bibleUnits,
    attribution: BIBLE_ATTRIBUTION,
  },
  {
    id: 'muziek',
    title: 'Muziek',
    subtitle: 'Spaans met christelijke liederen',
    units: [musicUnit],
    attribution:
      'De liedteksten zelf staan niet in de app (auteursrecht). De lessen leren je de woorden die je in de liederen hoort; de voorbeeldzinnen zijn speciaal voor deze app geschreven.',
  },
]

export const DEFAULT_PATH = 'vakantie'

export const allLessons: Lesson[] = paths.flatMap((p) => p.units.flatMap((u) => u.lessons))

export function pathById(id: string | undefined): Path {
  return paths.find((p) => p.id === id) ?? paths[0]
}

export function pathLessons(pathId: string): Lesson[] {
  return pathById(pathId).units.flatMap((u) => u.lessons)
}

export function pathLessonIds(pathId: string): string[] {
  return pathLessons(pathId).map((l) => l.id)
}

export function pathOf(lessonId: string): Path {
  return paths.find((p) => p.units.some((u) => u.lessons.some((l) => l.id === lessonId))) ?? paths[0]
}

/** lesson ids of the path the lesson belongs to, in order */
export function siblingIds(lessonId: string): string[] {
  return pathLessonIds(pathOf(lessonId).id)
}

export function lessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id)
}

/** earlier lessons in the same path */
export function lessonsBefore(id: string): Lesson[] {
  const lessons = pathLessons(pathOf(id).id)
  const i = lessons.findIndex((l) => l.id === id)
  return i < 0 ? [] : lessons.slice(0, i)
}

export function unitOf(lessonId: string): Unit | undefined {
  return paths.flatMap((p) => p.units).find((u) => u.lessons.some((l) => l.id === lessonId))
}

export function allWords(pathId: string): Word[] {
  return pathLessons(pathId).flatMap((l) => l.words)
}

export function allItemIds(): Set<string> {
  const ids = new Set<string>()
  for (const l of allLessons) {
    for (const w of l.words) ids.add(w.id)
    for (const s of l.sentences) ids.add(s.id)
    for (const g of l.grammar?.items ?? []) ids.add(g.id)
    if (l.dialogue) ids.add(l.dialogue.id)
    if (l.reading) ids.add(l.reading.id)
    if (l.passage) ids.add(l.passage.id)
  }
  return ids
}
