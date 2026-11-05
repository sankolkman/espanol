import type { Unit } from '../types'
import { phase1 } from './phase1'
import { phase2 } from './phase2'
import { phase3 } from './phase3'

export { commonWords } from './common'
export { chapterVerses } from './helpers'

export const bibleUnits: Unit[] = [phase1, phase2, ...phase3]

export const BIBLE_ATTRIBUTION =
  'Bijbeltekst: Palabra de Dios para ti, © 2020 Asociación Bíblica Latinoamericana, CC BY 4.0, via eBible.org. ' +
  'De vierkante haken uit de oorspronkelijke tekst zijn weggelaten. Nederlandse vertalingen van de verzen: eigen weergave.'
