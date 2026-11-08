import { buildLyricsSession, lyricLines } from './lyrics'

// a made-up text (not a real song) with a repeated chorus and labels
const TEXT = `[Verso 1]
Camino por la playa cada mañana
El sol brilla sobre el agua azul

Coro:
Canto contigo, canto contigo
Mi corazón está feliz hoy

[Verso 2]
Las estrellas miran desde el cielo oscuro y profundo esta noche
El viento sopla suave entre los árboles

Coro:
Canto contigo, canto contigo
Mi corazón está feliz hoy (x2)
CANTO CONTIGO, CANTO CONTIGO`

describe('lyricLines', () => {
  it('keeps every line once and drops labels and repeat marks', () => {
    expect(lyricLines(TEXT)).toEqual([
      'Camino por la playa cada mañana',
      'El sol brilla sobre el agua azul',
      'Canto contigo, canto contigo',
      'Mi corazón está feliz hoy',
      'Las estrellas miran desde el cielo oscuro y profundo esta noche',
      'El viento sopla suave entre los árboles',
    ])
  })
  it('returns nothing for empty text', () => {
    expect(lyricLines('  \n\n [Coro] \n')).toEqual([])
  })
})

describe('buildLyricsSession', () => {
  const song = { id: 's1', title: 'Mi canción', text: TEXT }

  it('makes exercises from the unique lines, never more than six words to type or say', () => {
    const words = (s: string) => s.split(/\s+/).filter((w) => /[\p{L}]/u.test(w)).length
    for (let seed = 1; seed <= 20; seed++) {
      const exs = buildLyricsSession(song, { speech: true, seed })
      expect(exs.length).toBeGreaterThanOrEqual(6)
      for (const e of exs) {
        if (e.kind === 'grammar') {
          expect(e.prompt.split('___')).toHaveLength(2)
          expect(words(e.accepted[0])).toBe(1)
        }
        if (e.kind === 'listen') expect(words(e.accepted[0])).toBeLessThanOrEqual(6)
        if (e.kind === 'speak') expect(words(e.es)).toBeLessThanOrEqual(6)
      }
    }
  })

  it('uses only fill-in and building without speech', () => {
    const exs = buildLyricsSession(song, { speech: false, seed: 3 })
    expect(exs.every((e) => e.kind === 'grammar' || e.kind === 'build')).toBe(true)
  })

  it('gives each exercise an id per line of this song', () => {
    for (const e of buildLyricsSession(song, { speech: true, seed: 5 })) expect(e.itemId).toMatch(/^lyric:s1:\d+$/)
  })
})
