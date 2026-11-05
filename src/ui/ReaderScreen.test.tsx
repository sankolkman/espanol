import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { pathLessonIds } from '../content'
import { emptyProgress } from '../logic/progress'
import { ReaderScreen } from './ReaderScreen'
import { ProgressProvider } from './SettingsContext'

const bible = pathLessonIds('bijbel')
const mark1 = 'b3l1'
const beforeMark1 = bible.slice(0, bible.indexOf(mark1))

function renderReader(completed: string[]) {
  return render(
    <ProgressProvider initial={{ ...emptyProgress(), completedLessons: completed }}>
      <ReaderScreen lessonId={mark1} />
    </ProgressProvider>,
  )
}

describe('ReaderScreen', () => {
  it('is locked until the lesson is unlocked', () => {
    renderReader([])
    expect(screen.getByText(/nog op slot/)).toBeInTheDocument()
  })

  it('shows the whole chapter with verse numbers', () => {
    renderReader(beforeMark1)
    expect(screen.getByRole('heading', { name: /Marcos 1/ })).toBeInTheDocument()
    const first = document.querySelector('.verse')
    expect(first?.textContent).toContain('Principio de las Buenas Noticias de Jesucristo.')
    expect(screen.getByText('45')).toBeInTheDocument()
  })

  it('translates a tapped word', async () => {
    const user = userEvent.setup()
    renderReader(beforeMark1)
    await user.click(screen.getAllByRole('button', { name: 'pescadores' })[0])
    expect(screen.getByRole('dialog')).toHaveTextContent('de visser')
  })

  it('offers a lookup link for unknown words', async () => {
    const user = userEvent.setup()
    renderReader(beforeMark1)
    await user.click(screen.getAllByRole('button', { name: 'saltamontes' })[0])
    expect(screen.getByRole('link', { name: /Opzoeken/ })).toHaveAttribute('href', expect.stringContaining('saltamontes'))
  })
})
