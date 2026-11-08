import type { ItemProgress } from './srs'

export interface Settings {
  voiceURI?: string
  rate: 1 | 0.75
  speechEnabled: boolean
  /** last opened learning path */
  path?: string
  /** colour theme: blauw (default), groen, paars */
  theme?: string
}

export interface Progress {
  version: 1
  completedLessons: string[]
  items: Record<string, ItemProgress>
  settings: Settings
}

export const STORAGE_KEY = 'espanol-progress-v1'

export function emptyProgress(): Progress {
  return { version: 1, completedLessons: [], items: {}, settings: { rate: 1, speechEnabled: true } }
}

function isProgress(x: unknown): x is Progress {
  if (!x || typeof x !== 'object') return false
  const p = x as Partial<Progress>
  return (
    p.version === 1 &&
    Array.isArray(p.completedLessons) &&
    p.completedLessons.every((s) => typeof s === 'string') &&
    !!p.items &&
    typeof p.items === 'object' &&
    !!p.settings &&
    typeof p.settings === 'object'
  )
}

function isItemProgress(x: unknown): x is ItemProgress {
  if (!x || typeof x !== 'object') return false
  const p = x as Record<string, unknown>
  const num = (v: unknown) => typeof v === 'number' && Number.isFinite(v) && v >= 0
  return (
    typeof p.box === 'number' && Number.isInteger(p.box) && p.box >= 1 && p.box <= 5 &&
    num(p.correct) && num(p.wrong) && num(p.lastSeen)
  )
}

function parse(json: string): Progress | null {
  try {
    const x = JSON.parse(json)
    if (!isProgress(x)) return null
    const d = emptyProgress()
    const items = Object.fromEntries(Object.entries(x.items).filter(([, v]) => isItemProgress(v)))
    return { ...d, ...x, items, settings: { ...d.settings, ...x.settings } }
  } catch {
    return null
  }
}

function defaultStorage(): Storage | undefined {
  try {
    return globalThis.localStorage
  } catch {
    return undefined
  }
}

export function loadProgress(storage: Storage | undefined = defaultStorage()): Progress {
  try {
    const raw = storage?.getItem(STORAGE_KEY)
    return (raw && parse(raw)) || emptyProgress()
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(p: Progress, storage: Storage | undefined = defaultStorage()): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    /* storage unavailable: progress stays in memory only */
  }
}

export function exportProgress(p: Progress): string {
  return JSON.stringify(p, null, 2)
}

export function importProgress(json: string): Progress {
  const p = parse(json)
  if (!p) throw new Error('Ongeldig bestand')
  return p
}

export function isUnlocked(lessonIds: string[], completed: string[], lessonId: string): boolean {
  const i = lessonIds.indexOf(lessonId)
  if (i < 0) return false
  return i === 0 || completed.includes(lessonIds[i - 1]) || completed.includes(lessonId)
}

export function nextLessonId(lessonIds: string[], completed: string[]): string | null {
  return lessonIds.find((id) => !completed.includes(id)) ?? null
}

export function pruneUnknown(p: Progress, knownItemIds: Set<string>, knownLessonIds: Set<string>): Progress {
  return {
    ...p,
    completedLessons: p.completedLessons.filter((id) => knownLessonIds.has(id)),
    items: Object.fromEntries(Object.entries(p.items).filter(([id]) => knownItemIds.has(id))),
  }
}
