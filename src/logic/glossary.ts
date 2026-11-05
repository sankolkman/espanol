import type { Word } from '../content/types'
import { stripAccents } from './normalize'

export interface GlossEntry {
  es: string
  nl: string
}

export type Glossary = Map<string, GlossEntry>

const key = (s: string) => stripAccents(s.toLowerCase().trim())
const ARTICLE = /^(el|la|los|las|un|una|unos|unas) /i

/** word lookup table: lemma, lemma without article, plural (+s/+es) and listed forms */
export function buildGlossary(words: Word[]): Glossary {
  const g: Glossary = new Map()
  const add = (form: string, entry: GlossEntry) => {
    const k = key(form)
    if (k && !g.has(k)) g.set(k, entry)
  }
  for (const w of words) {
    const entry = { es: w.es, nl: w.nl }
    const bare = w.es.replace(ARTICLE, '').replace(/[¿?¡!]/g, '')
    add(w.es, entry)
    add(bare, entry)
    if (!bare.includes(' ')) {
      add(bare + 's', entry)
      add(bare + 'es', entry)
    }
    for (const f of w.forms ?? []) add(f, entry)
  }
  return g
}

export function lookupWord(g: Glossary, token: string): GlossEntry | undefined {
  return g.get(key(token))
}

export interface Token {
  text: string
  word: boolean
}

/** splits text into word tokens and the separators between them */
export function tokenize(text: string): Token[] {
  return Array.from(text.matchAll(/([\p{L}\p{N}]+)|([^\p{L}\p{N}]+)/gu), (m) => ({ text: m[0], word: !!m[1] }))
}
