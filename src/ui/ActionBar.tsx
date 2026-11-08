import type { ReactNode } from 'react'

/** fixed bar at the bottom of the screen for the main actions (like the feedback panel) */
export function ActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="action-bar">
      <div className="action-bar-inner">{children}</div>
    </div>
  )
}
