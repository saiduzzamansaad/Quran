import { useAudio } from '../../context/AudioContext'

const AyatAudioPlayer = () => {
  const { currentAyah, playing, progress, pauseAyah, stopAyah } = useAudio()

  if (!currentAyah) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-softGray p-3 shadow-lg z-40">
      <div className="container mx-auto flex items-center gap-4">
        <button onClick={pauseAyah} className="text-primary">
          {playing ? '⏸️' : '▶️'}
        </button>
        <button onClick={stopAyah} className="text-gray-500">⏹️</button>
        <div className="flex-1 h-2 bg-softGray rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-sm text-gray-600">{currentAyah}</span>
      </div>
    </div>
  )
}

export default AyatAudioPlayer