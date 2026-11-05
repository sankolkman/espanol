import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { course } from '../content'
import { emptyProgress } from '../logic/progress'
import { ProgressProvider } from './SettingsContext'
import { filterWords, WordsScreen } from './WordsScreen'

const [first, second] = course[0].lessons

describe('filterWords', () => {
  const words = [
    { id: '1', es: 'el café', nl: 'de koffie' },
    { id: '2', es: 'el té', nl: 'de thee' },
  ]
  it('matches Spanish without accents', () => {
    expect(filterWords(words, 'cafe').map((w) => w.id)).toEqual(['1'])
  })
  it('matches Dutch', () => {
    expect(filterWords(words, 'koffie').map((w) => w.id)).toEqual(['1'])
  })
  it('returns everything for an empty query', () => {
    expect(filterWords(words, ' ')).toHaveLength(2)
  })
})

describe('WordsScreen', () => {
  it('lists only words from unlocked lessons and filters', async () => {
    const user = userEvent.setup()
    render(
      <ProgressProvider initial={emptyProgress()}>
        <WordsScreen />
      </ProgressProvider>,
    )
    expect(screen.getByText(first.words[0].es)).toBeInTheDocument()
    expect(screen.queryByText(second.words[0].es)).toBeNull()
    await user.type(screen.getByRole('searchbox'), first.words[1].nl)
    expect(screen.getByText(first.words[1].es)).toBeInTheDocument()
    expect(screen.queryByText(first.words[0].es)).toBeNull()
  })
})
