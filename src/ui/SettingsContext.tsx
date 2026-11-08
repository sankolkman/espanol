import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { allItemIds, allLessons } from '../content'
import { loadProgress, pruneUnknown, saveProgress, type Progress } from '../logic/progress'
import { applyTheme } from './themes'

interface Ctx {
  progress: Progress
  update(fn: (p: Progress) => Progress): void
}

const ProgressContext = createContext<Ctx | null>(null)

export function ProgressProvider(props: { children: ReactNode; initial?: Progress }) {
  const [progress, setProgress] = useState<Progress>(
    () => props.initial ?? pruneUnknown(loadProgress(), allItemIds(), new Set(allLessons.map((l) => l.id))),
  )
  useEffect(() => applyTheme(progress.settings.theme), [progress.settings.theme])
  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev)
      saveProgress(next)
      return next
    })
  }, [])
  return <ProgressContext.Provider value={{ progress, update }}>{props.children}</ProgressContext.Provider>
}

export function useProgress(): Ctx {
  const c = useContext(ProgressContext)
  if (!c) throw new Error('useProgress outside ProgressProvider')
  return c
}
