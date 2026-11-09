import { render, screen } from '@testing-library/react'
import { pathLessonIds } from '../content'
import { emptyProgress } from '../logic/progress'
import { LessonDone, LessonScreen } from './LessonScreen'
import { ProgressProvider } from './SettingsContext'
import { SourceTextScreen } from './SourceTextScreen'

beforeEach(() => localStorage.clear())

const withProgress = (ui: React.ReactNode, completed: string[] = []) =>
  render(<ProgressProvider initial={{ ...emptyProgress(), completedLessons: completed }}>{ui}</ProgressProvider>)

describe('SourceTextScreen', () => {
  it('shows the whole Bible passage with verse numbers and Dutch translation', () => {
    withProgress(<SourceTextScreen lessonId="b1l1" />)
    expect(screen.getByRole('heading', { name: /Mateo 6:9-13/ })).toBeInTheDocument()
    expect(screen.getByText(/Padre nuestro celestial/)).toBeInTheDocument()
    expect(screen.getByText(/Perdónanos nuestras deudas/)).toBeInTheDocument()
    expect(screen.getByText(/Geef ons vandaag ons dagelijks brood/)).toBeInTheDocument()
    expect(screen.getByText(/Palabra de Dios para ti/)).toBeInTheDocument()
  })

  it('for a song without own text: offers to search and to paste it', () => {
    withProgress(<SourceTextScreen lessonId="m1l1" />)
    expect(screen.getByRole('link', { name: /Zoek de songtekst/ })).toHaveAttribute('href', expect.stringContaining('Oc%C3%A9anos'))
    expect(screen.getByRole('link', { name: /Plak de tekst in de app/ })).toHaveAttribute('href', '#/liedjes/nieuw:Oc%C3%A9anos')
  })

  it('for a song with own text (same title): shows that text', () => {
    // made-up text, not the real song
    localStorage.setItem('espanol-songs-v1', JSON.stringify([{ id: 'x', title: 'océanos', text: 'Línea uno de prueba\nLínea dos de prueba' }]))
    withProgress(<SourceTextScreen lessonId="m1l1" />)
    expect(screen.getByText('Línea uno de prueba')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Oefen deze tekst/ })).toHaveAttribute('href', '#/liedjes/x')
  })
})

describe('buttons to the whole text', () => {
  it('lesson intro of a Bible passage links to the whole text', () => {
    withProgress(<LessonScreen lessonId="b1l1" />)
    expect(screen.getByRole('link', { name: /Bekijk de hele tekst/ })).toHaveAttribute('href', '#/tekst/b1l1')
  })

  it('lesson intro of a song links to the whole text', () => {
    withProgress(<LessonScreen lessonId="m1l1" />)
    expect(screen.getByRole('link', { name: /Bekijk de hele tekst/ })).toHaveAttribute('href', '#/tekst/m1l1')
  })

  it('the end of a lesson links to the whole text; Mark chapters go to the reader', () => {
    const bible = pathLessonIds('bijbel')
    withProgress(<LessonDone summary={{ correct: 3, total: 3, weakItems: [] }} pathId="bijbel" lessonId="b1l2" />)
    expect(screen.getByRole('link', { name: /Bekijk de hele tekst/ })).toHaveAttribute('href', '#/tekst/b1l2')
    document.body.innerHTML = ''
    withProgress(<LessonDone summary={{ correct: 3, total: 3, weakItems: [] }} pathId="bijbel" lessonId="b3l1" />, bible)
    expect(screen.getByRole('link', { name: /Bekijk de hele tekst/ })).toHaveAttribute('href', '#/lees/b3l1')
  })

  it('holiday lessons have no such button', () => {
    withProgress(<LessonDone summary={{ correct: 3, total: 3, weakItems: [] }} pathId="vakantie" lessonId="u1l1" />)
    expect(screen.queryByRole('link', { name: /Bekijk de hele tekst/ })).toBeNull()
  })
})
