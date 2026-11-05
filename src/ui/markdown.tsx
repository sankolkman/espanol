import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
}

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((c) => c.trim())

/** tiny markdown: paragraphs, **bold**, *italic*, "- " lists, pipe tables */
export function Markdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/)
  return (
    <div className="md">
      {blocks.map((block, bi) => {
        const lines = block.split('\n').filter((l) => l.trim())
        if (lines.every((l) => l.trim().startsWith('|'))) {
          const isSeparator = (l: string) => /^-+$/.test(l.replace(/[|\s:]/g, ''))
          const rows = lines.filter((l) => !isSeparator(l)).map(cells)
          const [head, ...body] = rows
          const showHead = head.some((c) => c !== '')
          return (
            <table key={bi}>
              {showHead && (
                <thead>
                  <tr>
                    {head.map((c, i) => (
                      <th key={i}>{inline(c)}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {body.map((r, ri) => (
                  <tr key={ri}>
                    {r.map((c, i) => (
                      <td key={i}>{inline(c)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
        if (lines.every((l) => l.trim().startsWith('- '))) {
          return (
            <ul key={bi}>
              {lines.map((l, i) => (
                <li key={i}>{inline(l.trim().slice(2))}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={bi}>
            {lines.map((l, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {inline(l)}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}
