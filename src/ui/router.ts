import { useEffect, useState } from 'react'

export type Route = { name: 'path' | 'lesson' | 'review' | 'grammar' | 'words' | 'settings'; id?: string }

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  switch (parts[0]) {
    case 'les':
      return parts[1] ? { name: 'lesson', id: decodeURIComponent(parts[1]) } : { name: 'path' }
    case 'herhalen':
      return { name: 'review' }
    case 'grammatica':
      return { name: 'grammar' }
    case 'woorden':
      return { name: 'words' }
    case 'instellingen':
      return { name: 'settings' }
    default:
      return { name: 'path' }
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(location.hash))
  useEffect(() => {
    const on = () => {
      setRoute(parseHash(location.hash))
      window.scrollTo?.(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

export function go(hash: string): void {
  location.hash = hash
}
