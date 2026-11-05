import { speak, ttsSupported } from '../speech/tts'
import { useProgress } from './SettingsContext'

export function useSpeak() {
  const { progress } = useProgress()
  const { voiceURI, rate, speechEnabled } = progress.settings
  return {
    enabled: speechEnabled && ttsSupported(),
    say: (text: string, slow = false) => speak(text, { voiceURI, rate: slow ? 0.7 : rate }),
  }
}

export function SpeakButton(props: { text: string; big?: boolean; slow?: boolean; label?: string }) {
  const { say } = useSpeak()
  if (!ttsSupported()) return null
  return (
    <button
      type="button"
      className={`speak-btn ${props.big ? 'big' : ''}`}
      aria-label={props.label ?? `Uitspreken: ${props.text}`}
      onClick={() => say(props.text, props.slow)}
    >
      {props.slow ? '🐢' : '🔊'}
    </button>
  )
}
