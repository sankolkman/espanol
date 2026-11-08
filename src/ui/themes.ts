export type ThemeId = 'blauw' | 'groen' | 'paars'

export const THEMES: { id: ThemeId; name: string; description: string; color: string; gradient: string }[] = [
  { id: 'blauw', name: 'Blauw', description: 'fris en vrolijk', color: '#2563eb', gradient: 'linear-gradient(135deg, #2563eb, #3b9cff, #4fd1c5)' },
  { id: 'groen', name: 'Groen', description: 'mint en lente', color: '#0f9d6e', gradient: 'linear-gradient(135deg, #0f9d6e, #2bb98a, #a3e05f)' },
  { id: 'paars', name: 'Paars', description: 'lila en roze', color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #a855f7, #f472b6)' },
]

export const DEFAULT_THEME: ThemeId = 'blauw'

export function themeById(id: string | undefined) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}

/** sets data-theme on <html> and the browser's theme colour */
export function applyTheme(id: string | undefined): void {
  const theme = themeById(id)
  document.documentElement.dataset.theme = theme.id
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.color)
}
