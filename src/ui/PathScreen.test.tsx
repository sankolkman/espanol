import { render, screen, within } from '@testing-library/react'
import { course } from '../content'
import { emptyProgress } from '../logic/progress'
import { PathScreen } from './PathScreen'
import { ProgressProvider } from './SettingsContext'

const [first, second] = course[0].lessons

const path = () => document.querySelector('.path') as HTMLElement

function renderWith(completed: string[]) {
  return render(
    <ProgressProvider initial={{ ...emptyProgress(), completedLessons: completed }}>
      <PathScreen />
    </ProgressProvider>,
  )
}

describe('PathScreen', () => {
  it('shows units and lessons with lock state', () => {
    renderWith([])
    expect(screen.getByText(course[0].title)).toBeInTheDocument()
    expect(within(path()).getByRole('link', { name: new RegExp(first.title) })).toHaveAttribute('href', `#/les/${first.id}`)
    expect(within(path()).queryByRole('link', { name: new RegExp(second.title) })).toBeNull()
    expect(within(path()).getByText(second.title).closest('[aria-disabled="true"]')).not.toBeNull()
  })

  it('unlocks the next lesson after completing one', () => {
    renderWith([first.id])
    expect(within(path()).getByRole('link', { name: new RegExp(second.title) })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Volgende les/ })).toHaveAttribute('href', `#/les/${second.id}`)
  })

  it('disables review until a lesson is completed', () => {
    renderWith([])
    expect(screen.getByRole('button', { name: /Herhalen/ })).toBeDisabled()
  })

  it('enables review after a completed lesson', () => {
    renderWith([first.id])
    expect(screen.getByRole('link', { name: /Herhalen/ })).toHaveAttribute('href', '#/herhalen/vakantie')
  })
})
