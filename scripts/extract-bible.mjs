// Extracts the verses the Bible path needs from the eBible.org VPL file of
// "Palabra de Dios para ti" (spapddpt_vpl.txt) into src/content/bible/text.json.
//
// Usage: node scripts/extract-bible.mjs <path/to/spapddpt_vpl.txt>
// Download: https://ebible.org/Scriptures/spapddpt_vpl.zip (CC BY 4.0)
//
// Change made to the text: the translator's square brackets [ ] (words added
// for readability) are removed; the words themselves are kept.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** [book, chapter, firstVerse, lastVerse] ; lastVerse = 0 means whole chapter */
const RANGES = [
  ['MAT', 6, 9, 13],
  ['JOH', 3, 16, 17],
  ['1JO', 4, 7, 8],
  ['MAT', 5, 3, 10],
  ['1CO', 13, 4, 8],
  ['JOH', 14, 6, 6],
  ['JOH', 8, 12, 12],
  ['JOH', 10, 11, 11],
  ['JOH', 11, 25, 25],
  ['MAT', 22, 37, 39],
  ['MAT', 11, 28, 30],
  ['LUK', 2, 8, 14],
  ['LUK', 15, 11, 20],
  ['LUK', 10, 30, 35],
  ['MAT', 8, 23, 27],
  ['JOH', 6, 8, 13],
  ['MAT', 28, 1, 7],
  ...Array.from({ length: 16 }, (_, i) => ['MAR', i + 1, 1, 0]),
]

const src = process.argv[2]
if (!src) {
  console.error('Usage: node scripts/extract-bible.mjs <spapddpt_vpl.txt>')
  process.exit(1)
}

const verses = new Map()
for (const line of readFileSync(src, 'utf8').split(/\r?\n/)) {
  const m = /^(\w+) (\d+):(\d+) (.*)$/.exec(line)
  if (m) verses.set(`${m[1]} ${m[2]}:${m[3]}`, m[4])
}

const clean = (t) => t.replace(/[[\]]/g, '').replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim()

const out = {}
for (const [book, chapter, first, last] of RANGES) {
  for (let v = first; last === 0 || v <= last; v++) {
    const ref = `${book} ${chapter}:${v}`
    const text = verses.get(ref)
    if (text === undefined) {
      if (last === 0) break
      throw new Error(`missing verse ${ref}`)
    }
    const cleaned = clean(text)
    if (cleaned === '') continue // e.g. the ']]' marker after Mark 16:8
    out[ref] = cleaned
  }
}

const target = resolve(dirname(fileURLToPath(import.meta.url)), '../src/content/bible/text.json')
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, JSON.stringify(out, null, 0).replace(/","/g, '",\n"') + '\n')
console.log(`wrote ${Object.keys(out).length} verses to ${target}`)
