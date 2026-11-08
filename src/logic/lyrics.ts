import { wordCount } from './chunks'
import { listenExercise, pickChunk, sentenceTiles, type Exercise, type ReviewPoolItem } from './lessonBuilder'
import { normalize, stripAccents } from './normalize'
import { mulberry32, shuffle } from './shuffle'

/** a song text the learner added themselves; stored only in their browser */
export interface UserSong {
  id: string
  title: string
  text: string
}

const LABEL =
  /^(\[.*\]|\(.*\)|(coro|estribillo|verso|puente|pre-?coro|precoro|intro|outro|final|chorus|verse|bridge|refrein|couplet|tag)\b[\s\d:.\-–]*)$/i
const REPEAT_MARK = /\s*[([]?\s*[x×]\s*\d+\s*[)\]]?\s*$/i

const key = (s: string) => stripAccents(normalize(s))

/** the unique lines of a song text, without section labels or repeat marks like (x2) */
export function lyricLines(text: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(REPEAT_MARK, '').trim()
    if (!line || LABEL.test(line) || !/\p{L}/u.test(line)) continue
    const k = key(line)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(line)
  }
  return out
}

const MAX_LINES = 12

/** practice session from the unique lines: fill in a word, build, listen, say (max 6 words) */
export function buildLyricsSession(song: UserSong, opts: { speech: boolean; seed: number }): Exercise[] {
  const rng = mulberry32(opts.seed)
  const lines = lyricLines(song.text).map((text, i) => ({ text, i }))
  const picked = shuffle(lines, rng)
    .slice(0, MAX_LINES)
    .sort((a, b) => a.i - b.i)
  const forms = opts.speech ? ['fill', 'listen', 'build', 'speak'] : ['fill', 'build']
  const allTiles = lines.flatMap((l) => sentenceTiles(l.text))

  return picked.map(({ text, i }, n) => {
    const itemId = `lyric:${song.id}:${i}`
    const item: ReviewPoolItem = { id: itemId, es: text, nl: song.title, isWord: false }
    let form = forms[(n + Math.floor(rng() * forms.length)) % forms.length]
    const count = wordCount(text)
    if (form === 'build' && (count < 3 || count > 8)) form = 'fill'

    if (form === 'listen') return listenExercise(item, [text], rng)
    if (form === 'speak') {
      if (count <= 6) return { kind: 'speak', itemId, es: text, nl: song.title }
      const part = pickChunk(text, 6, 3, rng)
      return {
        kind: 'speak',
        itemId,
        es: part.text,
        nl: song.title,
        context: { before: text.slice(0, part.start), after: text.slice(part.end) },
      }
    }
    if (form === 'build') {
      const tiles = sentenceTiles(text)
      const own = new Set(tiles.map(key))
      const extra = shuffle(
        [...new Set(allTiles)].filter((t) => !own.has(key(t))),
        rng,
      ).slice(0, 2)
      return { kind: 'build', itemId, promptNl: `Zet de regel uit "${song.title}" in de goede volgorde`, tiles: shuffle([...tiles, ...extra], rng), answer: tiles.join(' ') }
    }
    // fill in one word (at least 4 letters if possible)
    const words = Array.from(text.matchAll(/[\p{L}\p{N}]+/gu), (m) => ({ w: m[0], at: m.index! }))
    const longer = words.filter((x) => x.w.length >= 4)
    const pool = longer.length ? longer : words
    const pick = pool[Math.floor(rng() * pool.length)]
    return {
      kind: 'grammar',
      itemId,
      prompt: `${text.slice(0, pick.at)}___${text.slice(pick.at + pick.w.length)}`,
      nl: song.title,
      accepted: [pick.w],
    }
  })
}

// ---- storage (browser only, separate from progress) ----

const KEY = 'espanol-songs-v1'

function storage(): Storage | undefined {
  try {
    return globalThis.localStorage
  } catch {
    return undefined
  }
}

export function loadSongs(s: Storage | undefined = storage()): UserSong[] {
  try {
    const raw = s?.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list)
      ? list.filter((x) => x && typeof x.id === 'string' && typeof x.title === 'string' && typeof x.text === 'string')
      : []
  } catch {
    return []
  }
}

export function saveSongs(songs: UserSong[], s: Storage | undefined = storage()): void {
  try {
    s?.setItem(KEY, JSON.stringify(songs))
  } catch {
    /* storage unavailable */
  }
}
