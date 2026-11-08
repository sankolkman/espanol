import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { emptyProgress } from '../logic/progress'
import { LyricsScreen } from './LyricsScreen'
import { ProgressProvider } from './SettingsContext'

// made-up text, not a real song
const TEXT = 'Coro:\nCamino por la playa\nCamino por la playa\nEl sol brilla sobre el agua azul\nMi corazón está feliz hoy'

beforeEach(() => localStorage.clear())

const renderScreen = (songId?: string) =>
  render(
    <ProgressProvider initial={{ ...emptyProgress(), settings: { rate: 1, speechEnabled: false } }}>
      <LyricsScreen songId={songId} />
    </ProgressProvider>,
  )

describe('LyricsScreen', () => {
  it('adds a song, shows the unique line count and keeps it in this browser', async () => {
    const user = userEvent.setup()
    renderScreen()
    await user.type(screen.getByRole('textbox', { name: 'Titel' }), 'Mi canción')
    await user.click(screen.getByRole('textbox', { name: 'Songtekst' }))
    await user.paste(TEXT)
    expect(screen.getByText(/3 unieke regels/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Opslaan' }))
    expect(screen.getByRole('heading', { name: 'Mi canción' })).toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem('espanol-songs-v1')!)
    expect(saved).toHaveLength(1)
    expect(screen.getByRole('link', { name: /Oefen/ })).toHaveAttribute('href', `#/liedjes/${saved[0].id}`)
  })

  it('deletes a song after confirmation', async () => {
    localStorage.setItem('espanol-songs-v1', JSON.stringify([{ id: 'a', title: 'Mi canción', text: TEXT }]))
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const user = userEvent.setup()
    renderScreen()
    await user.click(screen.getByRole('button', { name: /Verwijder/ }))
    expect(screen.queryByRole('heading', { name: 'Mi canción' })).toBeNull()
    expect(JSON.parse(localStorage.getItem('espanol-songs-v1')!)).toEqual([])
  })

  it('practises a saved song', () => {
    localStorage.setItem('espanol-songs-v1', JSON.stringify([{ id: 'a', title: 'Mi canción', text: TEXT }]))
    renderScreen('a')
    expect(document.querySelector('.runner')).not.toBeNull()
  })
})
