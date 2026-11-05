import { GrammarScreen } from './ui/GrammarScreen'
import { LessonScreen, ReviewScreen } from './ui/LessonScreen'
import { PathScreen } from './ui/PathScreen'
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
  const inLesson = route.name === 'lesson' || route.name === 'review'
  return (
    <div className={`app ${inLesson ? 'in-lesson' : ''}`}>
      {route.name === 'lesson' && route.id ? (
        <LessonScreen key={route.id} lessonId={route.id} />
      ) : route.name === 'review' ? (
        <ReviewScreen />
      ) : route.name === 'grammar' ? (
        <GrammarScreen />
      ) : route.name === 'words' ? (
        <WordsScreen />
      ) : route.name === 'settings' ? (
        <SettingsScreen />
      ) : (
        <PathScreen />
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
