import { render } from '@testing-library/react'
import { Markdown } from './markdown'

describe('Markdown', () => {
  it('keeps the first data row of a table with an empty header', () => {
    const { container } = render(<Markdown text={'| | |\n|---|---|\n| yo | soy |\n| tú | eres |'} />)
    expect(container.querySelectorAll('tbody tr')).toHaveLength(2)
    expect(container.querySelector('thead')).toBeNull()
  })

  it('renders headers, bold and lists', () => {
    const { container } = render(<Markdown text={'| a | b |\n|---|---|\n| **x** | y |\n\n- een\n- twee'} />)
    expect(container.querySelectorAll('th')).toHaveLength(2)
    expect(container.querySelector('td strong')?.textContent).toBe('x')
    expect(container.querySelectorAll('li')).toHaveLength(2)
  })
})
