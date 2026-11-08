import { GrammarScreen } from './ui/GrammarScreen'
import { LessonScreen, ReviewScreen } from './ui/LessonScreen'
import { PathScreen } from './ui/PathScreen'
import { ReaderScreen } from './ui/ReaderScreen'
import { LyricsScreen } from './ui/LyricsScreen'
import { useRoute } from './ui/router'
import { ProgressProvider } from './ui/SettingsContext'
import { SettingsScreen } from './ui/SettingsScreen'
import { WordsScreen } from './ui/WordsScreen'

const NAV = [
  { name: 'path', href: '#/', label: 'Pad', icon: '🧭' },
  { name: 'grammar', href: '#/grammatica', label: 'Grammatica', icon: '📖' },
  { name: 'words', href: '#/woorden', label: 'Woorden', icon: '🗂️' },
  { name: 'settings', href: '#/instellingen', label: 'Instellingen', icon: '⚙️' },
] as const

function Screens() {
  const route = useRoute()
  const inLesson =
    route.name === 'lesson' || route.name === 'review' || route.name === 'reader' || (route.name === 'lyrics' && !!route.id)
  return (
    <div className={`app ${inLesson ? 'in-lesson' : ''}`}>
      {route.name === 'lesson' && route.id ? (
        <LessonScreen key={route.id} lessonId={route.id} />
      ) : route.name === 'review' ? (
        <ReviewScreen key={route.id} pathId={route.id} />
      ) : route.name === 'reader' && route.id ? (
        <ReaderScreen key={route.id} lessonId={route.id} />
      ) : route.name === 'lyrics' ? (
        <LyricsScreen key={route.id ?? 'list'} songId={route.id} />
      ) : route.name === 'grammar' ? (
        <GrammarScreen pathId={route.id} />
      ) : route.name === 'words' ? (
        <WordsScreen pathId={route.id} />
      ) : route.name === 'settings' ? (
        <SettingsScreen />
      ) : (
        <PathScreen pathId={route.id} />
      )}
      {!inLesson && (
        <nav className="bottom-nav" aria-label="Hoofdmenu">
          {NAV.map((n) => (
            <a key={n.name} href={n.href} className={route.name === n.name ? 'active' : ''}>
              <span aria-hidden="true">{n.icon}</span>
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}

export default function App() {
  return (
    <ProgressProvider>
      <Screens />
    </ProgressProvider>
  )
}
