import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { allItemIds, lessonIds } from '../content'
import { loadProgress, pruneUnknown, saveProgress, type Progress } from '../logic/progress'

interface Ctx {
  progress: Progress
  update(fn: (p: Progress) => Progress): void
}

const ProgressContext = createContext<Ctx | null>(null)

export function ProgressProvider(props: { children: ReactNode; initial?: Progress }) {
  const [progress, setProgress] = useState<Progress>(
    () => props.initial ?? pruneUnknown(loadProgress(), allItemIds(), new Set(lessonIds)),
  )
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
