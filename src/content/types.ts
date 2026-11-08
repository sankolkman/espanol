export interface Word {
  id: string
  es: string
  nl: string
  gender?: 'm' | 'f'
  altEs?: string[]
  altNl?: string[]
  example?: { es: string; nl: string }
  /** other spellings found in texts (verb forms, plural), used by the reader's word lookup */
  forms?: string[]
}

export interface Sentence {
  id: string
  es: string
  nl: string
  altEs?: string[]
}

/** prompt contains "___" where the answer goes */
export interface GrammarItem {
  id: string
  prompt: string
  nl?: string
  answer: string
  alt?: string[]
}

export interface Grammar {
  id: string
  title: string
  /** simple markdown: paragraphs, **bold**, pipe tables */
  explanation: string
  items: GrammarItem[]
}

/** es contains "___" when gap is set */
export interface DialogueTurn {
  speaker: string
  es: string
  nl: string
  gap?: { answer: string; alt?: string[]; options?: string[] }
}

export interface Dialogue {
  id: string
  title: string
  turns: DialogueTurn[]
}

export interface Reading {
  id: string
  title: string
  text: string
  questions: { q: string; options: string[]; correct: number }[]
}

export interface PassageVerse {
  ref: string
  es: string
  nl: string
}

/** Bible passage; every gap is an exact piece of text that is blanked out (first occurrence, in order) */
export interface Passage {
  id: string
  title: string
  /** human reference, e.g. "Mateo 6:9-13" */
  ref: string
  verses: PassageVerse[]
  gaps: string[]
}

/** a whole chapter to read in the reader */
export interface ChapterRead {
  book: string
  bookName: string
  chapter: number
  /** short Dutch summary shown above the text */
  summary: string
}

export interface Lesson {
  id: string
  title: string
  intro: string
  words: Word[]
  sentences: Sentence[]
  grammar?: Grammar
  dialogue?: Dialogue
  reading?: Reading
  passage?: Passage
  chapter?: ChapterRead
  /** music path: the song this lesson prepares for (no lyrics, only a search link) */
  song?: { title: string; query: string }
}

export interface Unit {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Path {
  id: string
  title: string
  subtitle: string
  units: Unit[]
  /** source/licence line shown on the path screen */
  attribution?: string
}
