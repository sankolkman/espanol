import { useEffect, useState } from 'react'

export type Route = {
  name: 'path' | 'lesson' | 'review' | 'reader' | 'lyrics' | 'grammar' | 'words' | 'settings'
  id?: string
}

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  const id = parts[1] ? decodeURIComponent(parts[1]) : undefined
  switch (parts[0]) {
    case 'pad':
      return { name: 'path', id }
    case 'les':
      return id ? { name: 'lesson', id } : { name: 'path' }
    case 'lees':
      return id ? { name: 'reader', id } : { name: 'path' }
    case 'liedjes':
      return { name: 'lyrics', id }
    case 'herhalen':
      return { name: 'review', id }
    case 'grammatica':
      return { name: 'grammar', id }
    case 'woorden':
      return { name: 'words', id }
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
