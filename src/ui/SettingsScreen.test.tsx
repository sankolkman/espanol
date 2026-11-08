import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { emptyProgress, STORAGE_KEY } from '../logic/progress'
import { ProgressProvider } from './SettingsContext'
import { SettingsScreen } from './SettingsScreen'

beforeEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

describe('colour theme', () => {
  it('uses blue by default', () => {
    render(
      <ProgressProvider initial={emptyProgress()}>
        <SettingsScreen />
      </ProgressProvider>,
    )
    expect(document.documentElement.dataset.theme).toBe('blauw')
    expect(screen.getByRole('button', { name: /Blauw/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('switches theme, applies it and remembers it', async () => {
    const user = userEvent.setup()
    render(
      <ProgressProvider initial={emptyProgress()}>
        <SettingsScreen />
      </ProgressProvider>,
    )
    await user.click(screen.getByRole('button', { name: /Paars/ }))
    expect(document.documentElement.dataset.theme).toBe('paars')
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).settings.theme).toBe('paars')
    await user.click(screen.getByRole('button', { name: /Groen/ }))
    expect(document.documentElement.dataset.theme).toBe('groen')
  })

  it('offers exactly three themes and no orange', () => {
    render(
      <ProgressProvider initial={emptyProgress()}>
        <SettingsScreen />
      </ProgressProvider>,
    )
    expect(document.querySelectorAll('.theme-choice')).toHaveLength(3)
    expect(screen.queryByRole('button', { name: /Oranje/ })).toBeNull()
  })
})
