import { allWords } from '../content'
import { commonWords } from '../content/bible'
import { buildGlossary, type Glossary } from '../logic/glossary'

let cache: Glossary | null = null

/** word lookup: Bible lesson words, then holiday words, then common small words */
export function appGlossary(): Glossary {
  cache ??= buildGlossary([...allWords('bijbel'), ...allWords('vakantie'), ...commonWords])
  return cache
}
