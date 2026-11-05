# Español leerapp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A static web app (laptop first, mobile-friendly) that teaches beginner Spanish (es-ES) for a holiday in Spain, built around a lesson path with vocabulary, sentences, listening, speaking, grammar, fill-in dialogues and short readings.

**Architecture:** Vite + React + TypeScript single-page app with no backend. Course content lives as typed TypeScript data in `src/content/`. Pure logic (answer checking, spaced repetition, lesson building, progress) lives in `src/logic/` and is unit-tested with Vitest. The browser Web Speech API is wrapped in `src/speech/`. UI screens live in `src/ui/`. Progress is stored in `localStorage`.

**Tech Stack:** Node 24, Vite (latest), React 18+, TypeScript (strict), Vitest + @testing-library/react + jsdom. No router library (simple hash routing), no state library.

**Spec:** `docs/superpowers/specs/2026-11-05-espanol-leerapp-design.md`

## Global Constraints

- UI language and all explanations: Dutch. Target language: Spanish from Spain (es-ES), incl. *vosotros*, Spain vocabulary (*zumo, móvil, coche*).
- No streaks, XP, hearts, levels, leaderboards, accounts, sync, backend.
- Must run with `npm install && npm run dev`; `npm run build` must produce a static `dist/` that works when hosted under a sub-path (set `base: './'` in Vite config).
- Mobile-first single-column layout, large buttons; light/dark follows `prefers-color-scheme`.
- TTS: `speechSynthesis`, prefer an `es-ES` voice (prefer names containing "Natural" or "Online"); recognition: `SpeechRecognition || webkitSpeechRecognition`, `lang='es-ES'`, `maxAlternatives=5`.
- Typed answer checking: ignore case, punctuation (incl. ¿ ¡), extra whitespace; missing accent / ñ→n counts as correct with a note showing the correct spelling.
- ES→NL typing only for single words; sentences toward Dutch use multiple choice or sentence building.
- Every typed exercise judged wrong offers "Ik had het goed" which re-marks it correct.
- Speaking: after 2 failed attempts the user can continue; this is not counted wrong. A per-session/settings switch disables listening and speaking ("Ik kan nu niet luisteren/praten").
- Lessons: 15–25 exercises, ~30% review items from earlier lessons; wrong answers re-queued at the end until correct; next lesson unlocks when a lesson is finished; finished lessons are replayable.
- Leitner boxes 1–5. Course: ~20 lessons in 6 units, 5 new words in early lessons rising to ~10 later.
- No commits are part of this plan (the folder is not a git repo; the user decides on version control).

## Review Focus

1. **Content changed after progress was saved** (item/lesson ids no longer exist) → progress loads without crashing, unknown ids are ignored. Test in Task 3.
2. **Corrupt or missing `localStorage` data, or `localStorage` throwing** → app starts with fresh progress. Test in Task 3.
3. **No es-ES voice installed** → fall back to any voice whose `lang` starts with `es`, else default voice with `lang='es-ES'`; settings shows a notice. Test in Task 5.
4. **Microphone permission denied / recognition unsupported (Firefox)** → speak exercises are replaced by a typing exercise of the same item; no hang. Tests in Tasks 4 and 5.
5. **Empty answer submitted** → "Controleer" disabled; never counted wrong. Test in Task 7.

---

## File structure

```
index.html, vite.config.ts, tsconfig*.json, package.json, readme.md
public/manifest.webmanifest, public/icon.svg
src/main.tsx, src/App.tsx, src/styles.css
src/content/types.ts            content types
src/content/unit1.ts … unit6.ts one Unit per file
src/content/index.ts            course: Unit[], lookup helpers
src/content/content.test.ts     content integrity tests
src/logic/normalize.ts (+test)  text normalising and answer checking
src/logic/speechMatch.ts (+test)
src/logic/srs.ts (+test)        Leitner
src/logic/progress.ts (+test)   load/save/export/import/unlock
src/logic/lessonBuilder.ts (+test)
src/logic/shuffle.ts            seeded rng + shuffle
src/speech/tts.ts (+test), src/speech/recognition.ts (+test)
src/ui/router.ts                hash routing hook
src/ui/PathScreen.tsx, LessonIntro.tsx, LessonRunner.tsx, LessonDone.tsx,
src/ui/GrammarScreen.tsx, WordsScreen.tsx, SettingsScreen.tsx
src/ui/exercises/*.tsx          one component per exercise kind
src/ui/SettingsContext.tsx
```

---

### Task 1: Scaffold + content types + answer checking

**Files:**
- Create: project scaffold (`npm create vite@latest . -- --template react-ts`, keep existing `readme.md`), `vite.config.ts` (add `base: './'`, Vitest `environment: 'jsdom'`), `src/content/types.ts`, `src/logic/normalize.ts`
- Test: `src/logic/normalize.test.ts`

**Interfaces:**
- Produces (`src/content/types.ts`):
  ```ts
  export interface Word { id: string; es: string; nl: string; gender?: 'm'|'f'; altEs?: string[]; altNl?: string[]; example?: { es: string; nl: string } }
  export interface Sentence { id: string; es: string; nl: string; altEs?: string[] }
  export interface GrammarItem { id: string; prompt: string; nl?: string; answer: string; alt?: string[] }  // prompt contains "___"
  export interface Grammar { id: string; title: string; explanation: string /* simple markdown: paragraphs, **bold**, tables with | */; items: GrammarItem[] }
  export interface DialogueTurn { speaker: string; es: string; nl: string; gap?: { answer: string; alt?: string[]; options?: string[] } } // es contains "___" when gap
  export interface Dialogue { id: string; title: string; turns: DialogueTurn[] }
  export interface Reading { id: string; title: string; text: string; questions: { q: string; options: string[]; correct: number }[] }
  export interface Lesson { id: string; title: string; intro: string; words: Word[]; sentences: Sentence[]; grammar?: Grammar; dialogue?: Dialogue; reading?: Reading }
  export interface Unit { id: string; title: string; lessons: Lesson[] }
  ```
- Produces (`src/logic/normalize.ts`):
  ```ts
  export function normalize(s: string): string            // lowercase, strip punctuation incl ¿¡.,!?;:"' , collapse spaces, trim
  export function stripAccents(s: string): string          // NFD remove diacritics (ñ→n too)
  export type CheckResult = { verdict: 'correct' | 'almost' | 'wrong'; expected: string }
  export function checkAnswer(input: string, accepted: string[]): CheckResult   // accepted[0] is the canonical expected
  ```

- [ ] **Step 1: Scaffold** — run the Vite command, `npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom`, add `"test": "vitest run"` script. Run `npm run build` → succeeds.
- [ ] **Step 2: Write failing tests** in `normalize.test.ts`:
  ```ts
  expect(checkAnswer('¿Dónde está el baño?', ['¿Dónde está el baño?']).verdict).toBe('correct')
  expect(checkAnswer('  donde ESTÁ el baño ', ['¿Dónde está el baño?']).verdict).toBe('almost')
  expect(checkAnswer('dónde está el baño', ['¿Dónde está el baño?']).verdict).toBe('correct')
  expect(checkAnswer('espana', ['España']).verdict).toBe('almost')
  expect(checkAnswer('una cerveza', ['una caña', 'una cerveza']).verdict).toBe('correct')
  expect(checkAnswer('una cerveza', ['una caña', 'una cerveza']).expected).toBe('una caña')
  expect(checkAnswer('hola', ['adiós']).verdict).toBe('wrong')
  ```
- [ ] **Step 3: Run** `npm test` → FAIL (module missing).
- [ ] **Step 4: Implement** `normalize.ts`. `correct` if `normalize(input)` equals `normalize(a)` for some accepted `a`; else `almost` if equal after `stripAccents`; else `wrong`.
- [ ] **Step 5: Run** `npm test` → PASS.

### Task 2: Speech matching + Leitner SRS

**Files:**
- Create: `src/logic/speechMatch.ts`, `src/logic/srs.ts`, `src/logic/shuffle.ts`
- Test: `src/logic/speechMatch.test.ts`, `src/logic/srs.test.ts`

**Interfaces:**
- Consumes: `normalize`, `stripAccents` (Task 1).
- Produces:
  ```ts
  export function matchSpeech(heard: string[], target: string): boolean
  export interface ItemProgress { box: 1|2|3|4|5; correct: number; wrong: number; lastSeen: number /* epoch ms */ }
  export function updateItem(p: ItemProgress | undefined, correct: boolean, now: number): ItemProgress
  export function reviewPriority(p: ItemProgress, now: number): number   // higher = more due
  export function pickReview(ids: string[], progress: Record<string, ItemProgress>, n: number, now: number): string[]
  export function mulberry32(seed: number): () => number
  export function shuffle<T>(arr: T[], rng: () => number): T[]   // returns new array
  ```

- [ ] **Step 1: Failing tests.** speechMatch: `matchSpeech(['Donde esta el baño'], '¿Dónde está el baño?') === true`; `matchSpeech(['hola buenas', 'hola buenos días'], 'Hola, buenos días') === true`; one wrong word in a 5+ word target still `true` (`matchSpeech(['quisiera un café con leche'], 'Quisiera un café con leche, por favor')` → true since ≥80% words match); `matchSpeech(['adiós'], 'buenos días') === false`; `matchSpeech([], 'hola') === false`.
  srs: new item correct → box 2; wrong → box 1; box 5 + correct stays 5; `wrong` counter increments; `pickReview` with items in box 1 last seen long ago returns those before box 5 items seen just now; returns at most `n`, and fewer if fewer ids.
- [ ] **Step 2: Run** `npm test` → FAIL.
- [ ] **Step 3: Implement.** `matchSpeech`: compare word lists of `stripAccents(normalize(x))`; true if any alternative has ≥80% of target words present in order-insensitive multiset match AND target length ≤ heard length + 1; for targets of ≤3 words require exact normalized equality. Leitner intervals (days) per box: `[0, 1, 2, 4, 8]` for boxes 1–5; `reviewPriority = (now - lastSeen)/interval(box) + wrong/(correct+1)`.
- [ ] **Step 4: Run** `npm test` → PASS.

### Task 3: Progress store

**Files:**
- Create: `src/logic/progress.ts`
- Test: `src/logic/progress.test.ts`

**Interfaces:**
- Consumes: `ItemProgress`, `updateItem` (Task 2).
- Produces:
  ```ts
  export interface Settings { voiceURI?: string; rate: 1 | 0.75; speechEnabled: boolean }
  export interface Progress { version: 1; completedLessons: string[]; items: Record<string, ItemProgress>; settings: Settings }
  export const STORAGE_KEY = 'espanol-progress-v1'
  export function emptyProgress(): Progress
  export function loadProgress(storage?: Storage): Progress
  export function saveProgress(p: Progress, storage?: Storage): void
  export function exportProgress(p: Progress): string            // JSON
  export function importProgress(json: string): Progress          // throws Error('Ongeldig bestand') on bad input
  export function isUnlocked(lessonIds: string[], completed: string[], lessonId: string): boolean   // first lesson always; else previous completed
  export function nextLessonId(lessonIds: string[], completed: string[]): string | null
  export function pruneUnknown(p: Progress, knownItemIds: Set<string>, knownLessonIds: Set<string>): Progress
  ```

- [ ] **Step 1: Failing tests:** round-trip save/load; `loadProgress` with `'{garbage'` → `emptyProgress()`; with a storage whose `getItem` throws → `emptyProgress()`; `saveProgress` on throwing storage does not throw; `importProgress('{}')` throws `'Ongeldig bestand'`; `isUnlocked(['a','b','c'], [], 'a')` true, `'b'` false, `isUnlocked(['a','b','c'], ['a'], 'b')` true; `nextLessonId` returns first not completed, `null` when all done; `pruneUnknown` drops item and lesson ids not in the known sets (Review Focus 1). Defaults: `rate: 1`, `speechEnabled: true`.
- [ ] **Step 2: Run** → FAIL. **Step 3: Implement.** **Step 4: Run** → PASS.

### Task 4: Lesson builder

**Files:**
- Create: `src/logic/lessonBuilder.ts`
- Test: `src/logic/lessonBuilder.test.ts`

**Interfaces:**
- Consumes: content types (Task 1), `pickReview`, `shuffle`, `mulberry32` (Task 2), `ItemProgress`.
- Produces:
  ```ts
  export type Exercise =
    | { kind: 'intro'; itemId: string; word: Word }
    | { kind: 'choice'; itemId: string; prompt: string; promptLang: 'es'|'nl'; options: string[]; answer: string }
    | { kind: 'type'; itemId: string; prompt: string; promptLang: 'es'|'nl'; accepted: string[] }
    | { kind: 'build'; itemId: string; promptNl: string; tiles: string[]; answer: string }   // tiles = shuffled es words + 2 distractors
    | { kind: 'listen'; itemId: string; es: string; accepted: string[] }
    | { kind: 'speak'; itemId: string; es: string; nl: string }
    | { kind: 'grammar'; itemId: string; prompt: string; nl?: string; accepted: string[] }
    | { kind: 'dialogue'; itemId: string; dialogue: Dialogue }
    | { kind: 'reading'; itemId: string; reading: Reading }
  export interface ReviewPoolItem { id: string; es: string; nl: string; isWord: boolean; altEs?: string[]; altNl?: string[] }
  export function reviewPool(lessonsBefore: Lesson[]): ReviewPoolItem[]
  export function buildLesson(lesson: Lesson, before: Lesson[], progress: Record<string, ItemProgress>, opts: { speech: boolean; seed: number; now: number }): Exercise[]
  export function buildReviewSession(completed: Lesson[], progress: Record<string, ItemProgress>, opts: { speech: boolean; seed: number; now: number }): Exercise[]  // 15 items
  ```
  Item ids: word/sentence id; grammar item id; dialogue id; reading id.

- [ ] **Step 1: Failing tests** using a small fixture lesson (6 words, 3 sentences, grammar with 3 items, dialogue):
  - every new word gets an `intro` before any other exercise on that word;
  - total length between 15 and 25;
  - with `before` containing 10 items, ≥ 25% of non-intro exercises have itemIds from earlier lessons; with empty `before`, none do and length still ≥ 15 (repeat current items in other forms);
  - no `type` exercise with `promptLang: 'es'` (i.e. ES→NL typing) has an itemId of a sentence;
  - `opts.speech=false` → no `listen` or `speak` exercises (Review Focus 4);
  - same seed → identical output; `choice.options` contains `answer` and has 4 unique entries;
  - grammar items and dialogue appear after the words' intros.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** Order: intros of new words (interleaved with one `choice` each) → mixed practice on new words/sentences (choice both directions, type NL→ES, type ES→NL for words only, build for sentences, listen, speak) → grammar items → dialogue → reading → review items (~30%) shuffled into the practice block. Distractors come from other words in the lesson + pool. Moves toward harder forms in later lessons: if lesson index ≥ 8, prefer `type`/`speak` over `choice`.
- [ ] **Step 4: Run** → PASS.

### Task 5: Speech services

**Files:**
- Create: `src/speech/tts.ts`, `src/speech/recognition.ts`
- Test: `src/speech/tts.test.ts`, `src/speech/recognition.test.ts`

**Interfaces:**
- Produces:
  ```ts
  // tts.ts
  export function pickSpanishVoice(voices: SpeechSynthesisVoice[], preferredURI?: string): SpeechSynthesisVoice | null
  export function getVoices(): Promise<SpeechSynthesisVoice[]>   // waits for voiceschanged, max 1500ms
  export function speak(text: string, opts: { voiceURI?: string; rate: number }): void   // no-op if unsupported
  export function ttsSupported(): boolean
  // recognition.ts
  export function recognitionSupported(): boolean
  export function listenOnce(): Promise<{ ok: true; alternatives: string[] } | { ok: false; reason: 'unsupported'|'denied'|'no-speech'|'error' }>
  ```

- [ ] **Step 1: Failing tests:** `pickSpanishVoice` prefers `preferredURI` if present; else es-ES with "Natural"/"Online" in name; else any es-ES; else any `lang` starting with `es`; else `null` (Review Focus 3). `recognitionSupported()` false when neither global exists (jsdom). `listenOnce()` resolves `{ok:false, reason:'unsupported'}` when unsupported; with a mocked recognition that fires `onerror` `{error:'not-allowed'}` → `reason: 'denied'` (Review Focus 4).
- [ ] **Step 2: Run** → FAIL. **Step 3: Implement** (`speak` cancels ongoing speech first, sets `lang='es-ES'`). **Step 4: Run** → PASS.

### Task 6: App shell, path, settings

**Files:**
- Create: `src/ui/router.ts`, `src/ui/SettingsContext.tsx`, `src/ui/PathScreen.tsx`, `src/ui/SettingsScreen.tsx`, `src/styles.css`; Modify: `src/App.tsx`, `src/main.tsx`, `index.html` (`lang="nl"`, title "Español")
- Create: `src/content/index.ts` with a temporary single-lesson `unit1.ts` stub (replaced in Task 9)
- Test: `src/ui/PathScreen.test.tsx`

**Interfaces:**
- Consumes: Progress API (Task 3), voices API (Task 5).
- Produces:
  ```ts
  // content/index.ts
  export const course: Unit[]
  export const allLessons: Lesson[]                 // flattened, in path order
  export function lessonById(id: string): Lesson | undefined
  export function lessonsBefore(id: string): Lesson[]
  export function allItemIds(): Set<string>
  // router.ts — routes: '#/' path, '#/les/:id', '#/herhalen', '#/grammatica', '#/woorden', '#/instellingen'
  export function useRoute(): { name: 'path'|'lesson'|'review'|'grammar'|'words'|'settings'; id?: string }
  export function go(hash: string): void
  // SettingsContext.tsx
  export function ProgressProvider(props: { children: ReactNode }): JSX.Element
  export function useProgress(): { progress: Progress; update(fn: (p: Progress) => Progress): void }  // saves on every update
  ```

- [ ] **Step 1: Failing test:** PathScreen renders units and lessons; first lesson button enabled, second shows locked state; after marking first complete in progress, second enabled; "Volgende les" links to `#/les/<next>`; "Herhalen" disabled when no lesson completed.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** On startup, `pruneUnknown` the loaded progress. Settings: voice dropdown (es voices; notice "Geen Spaanse stem gevonden…" when none), speed Normaal/Langzaam, toggle "Luister- en spreekoefeningen", export (download JSON), import (file input, shows error text on failure), "Voortgang wissen" with `confirm()`. Bottom nav: Pad · Grammatica · Woorden · Instellingen. CSS: CSS variables, dark via media query, max-width 640px centered, buttons ≥ 48px high.
- [ ] **Step 4: Run** → PASS; `npm run dev` and check visually.

### Task 7: Lesson flow and exercise components

**Files:**
- Create: `src/ui/LessonIntro.tsx`, `src/ui/LessonRunner.tsx`, `src/ui/LessonDone.tsx`, `src/ui/exercises/{Intro,Choice,TypeAnswer,Build,Listen,Speak,GrammarFill,DialogueFill,ReadingQuiz}.tsx`, `src/ui/SpeakButton.tsx` (speaker icon calling `speak`)
- Test: `src/ui/LessonRunner.test.tsx`

**Interfaces:**
- Consumes: `buildLesson`, `buildReviewSession`, `Exercise` (Task 4), `checkAnswer` (Task 1), `matchSpeech`, `updateItem` (Task 2), speech (Task 5), `useProgress` (Task 6).
- Produces: each exercise component `(props: { ex: Exercise; onResult(correct: boolean | null): void })` — `null` = skipped, not counted. `LessonRunner(props: { exercises: Exercise[]; onFinish(summary: { correct: number; total: number; weakItems: string[] }): void })`.

- [ ] **Step 1: Failing tests** (LessonRunner with a 3-exercise fixture: choice, type, type):
  - "Controleer" disabled while input empty (Review Focus 5);
  - wrong answer shows feedback with expected answer and "Ik had het goed"; clicking it counts as correct and does not requeue;
  - a wrong answer (not overridden) re-appears after the last exercise; lesson finishes only when it's answered correctly;
  - `almost` verdict shows "Let op de spelling: <expected>" and counts correct;
  - `onFinish` called once with correct totals.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement.** Progress bar on top. Each graded result calls `update(p => ({...p, items: {...p.items, [id]: updateItem(...)}}))` with `Date.now()`. Speak: mic button → `listenOnce` → `matchSpeech`; after 2 failures or on `denied`/`unsupported`, show "Ga verder" (`onResult(null)`); "Ik kan nu niet praten" button sets `speechEnabled=false` and skips. Listen: plays audio on mount + replay buttons (normal, slow 0.75), then type field. DialogueFill: shows turns sequentially with speaker label and Dutch translation toggle; gaps as input or option buttons; correct if all gaps pass `checkAnswer`. ReadingQuiz: text then questions as choices. GrammarFill: prompt with input in place of `___`. Build: tap tiles to append/remove. LessonIntro shows `intro` and the grammar explanation (render the simple markdown: paragraphs, `**bold**`, pipe tables) before "Start". LessonDone: score, list of weak items with translation, marks lesson completed (lessons only, not review), buttons "Terug naar pad".
- [ ] **Step 4: Run** → PASS; play through the stub lesson in `npm run dev`.

### Task 8: Grammar overview and word list

**Files:**
- Create: `src/ui/GrammarScreen.tsx`, `src/ui/WordsScreen.tsx`, `src/ui/markdown.tsx` (extract from Task 7 if built there)
- Test: `src/ui/WordsScreen.test.tsx`

**Interfaces:**
- Consumes: `course`, `isUnlocked`, `useProgress`, `SpeakButton`.

- [ ] **Step 1: Failing test:** WordsScreen lists only words from unlocked lessons; search "cafe" matches "café" and Dutch "koffie" search matches too.
- [ ] **Step 2: Run** → FAIL. **Step 3: Implement** (GrammarScreen: list of grammar titles of unlocked lessons, click expands explanation). **Step 4: Run** → PASS.

### Task 9: Course content units 1–3

**Files:**
- Create/replace: `src/content/unit1.ts`, `unit2.ts`, `unit3.ts`; Modify `src/content/index.ts`
- Test: `src/content/content.test.ts`

Content per spec §7 (Dutch explanations written for a beginner, no jargon without explanation; Spain Spanish):
- **Unit 1 Begroeten en voorstellen** (3 lessons): greetings/farewells, *me llamo / soy / ¿cómo te llamas?*, *¿qué tal?*, *de dónde eres*, countries; grammar: uitspraak-basics, *ser* (yo/tú/él/ella/usted).
- **Unit 2 Getallen, tijd en betalen** (3–4 lessons): 0–100, prices, *¿cuánto cuesta?*, *la cuenta*, hours (*es la una, son las…*), days; grammar: lidwoorden el/la/un/una, meervoud.
- **Unit 3 Eten en drinken** (4 lessons): café, tapas, restaurant, menu words; *quisiera, ¿me pone…?, para mí*; grammar: *querer*, regelmatige -ar-werkwoorden (incl. *vosotros*). Each lesson a dialogue (bar/restaurant) from lesson 2 on; unit 3 lessons 3–4 have a reading (menukaart, krijtbord).

Id convention: `u1l1-w-hola`, `u1l1-s-1`, `u1l1-g-1`, `u1l1-d`, `u3l4-r`.

- [ ] **Step 1: Write content integrity tests** (iterate over the whole course): all ids unique; every lesson has ≥5 words and ≥2 sentences; words per lesson ≤ 10; every grammar item and dialogue gap turn contains `___`; every gap `options` (if set) includes `answer`; reading `correct` index is in range; lesson count per course ≥ 18 (fails until Task 10 – mark with `it.todo` here, enable in Task 10).
- [ ] **Step 2: Write content** for units 1–3 (~11 lessons, new words rising 5 → 8).
- [ ] **Step 3: Self-review the Spanish** line by line: spelling and accents, gender/article agreement, es-ES usage (vosotros, *zumo*, *vale*), natural phrasing; Dutch translations natural.
- [ ] **Step 4: Run** `npm test` → PASS.

### Task 10: Course content units 4–6

**Files:**
- Create: `src/content/unit4.ts`, `unit5.ts`, `unit6.ts`; Modify `src/content/index.ts`, `src/content/content.test.ts` (enable lesson-count test)

- **Unit 4 De weg vragen en vervoer** (3 lessons): *¿dónde está…?, a la derecha/izquierda, todo recto*, metro/bus/tren tickets; grammar: *estar* vs *ser*, *hay*, plaatsaanduidingen.
- **Unit 5 Hotel en accommodatie** (3 lessons): reservation, check-in, room problems; grammar: *tener, necesitar*, vraagwoorden.
- **Unit 6 Winkelen en kleine problemen** (3 lessons): clothes/sizes/colours, pharmacy, *estoy enfermo/a*, lost items; grammar: bijvoeglijke naamwoorden (overeenkomst), -er/-ir-werkwoorden, *ir a* + infinitief.
Every lesson has a dialogue; most have a reading. New words 8 → 10.

- [ ] **Step 1: Write content** (~9 lessons, total ≥ 20).
- [ ] **Step 2: Self-review the Spanish** as in Task 9.
- [ ] **Step 3: Run** `npm test` → PASS (lesson-count test enabled).

### Task 11: PWA basics, readme, final verification

**Files:**
- Create: `public/manifest.webmanifest` (name "Español", display standalone, theme color), `public/icon.svg`; Modify: `index.html` (manifest link, viewport), `readme.md` (Dutch: wat het is, `npm install`, `npm run dev`, `npm test`, `npm run build`, hosten op Netlify/GitHub Pages, browsers: Chrome/Edge voor spraak)

- [ ] **Step 1:** Run `npm test` → all PASS.
- [ ] **Step 2:** Run `npm run build` → succeeds; `npx vite preview` and open — app loads from `dist/` with relative paths.
- [ ] **Step 3:** Manual check in Chrome/Edge at phone width (DevTools 390px) and laptop width: play lesson 1 end to end incl. listen and speak; reload keeps progress; settings toggle off speech removes listen/speak; export → wipe → import restores progress.
