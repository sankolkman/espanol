export interface Word {
  id: string
  es: string
  nl: string
  gender?: 'm' | 'f'
  altEs?: string[]
  altNl?: string[]
  example?: { es: string; nl: string }
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

export interface Lesson {
  id: string
  title: string
  intro: string
  words: Word[]
  sentences: Sentence[]
  grammar?: Grammar
  dialogue?: Dialogue
  reading?: Reading
}

export interface Unit {
  id: string
  title: string
  lessons: Lesson[]
}
