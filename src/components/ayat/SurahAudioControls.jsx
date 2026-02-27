import { useAudio } from '../../context/AudioContext'

const SurahAudioControls = ({ surah }) => {
  const { 
    currentSurah, 
    currentAyahIndex, 
    playing, 
    progress, 
    repeatMode,
    playSurah, 
    pause, 
    resume, 
    stop, 
    next, 
    previous, 
    toggleRepeat 
  } = useAudio()

  const isPlayingThisSurah = currentSurah?.number === surah.number

  const handlePlayPause = () => {
    if (!isPlayingThisSurah) {
      playSurah(surah)
    } else if (playing) {
      pause()
    } else {
      resume()
    }
  }

  const handleStop = () => {
    stop()
  }

  const repeatIcon = {
    none: '🔁',
    one: '🔂',
    all: '🔁'
  }

  return (
    <div className="bg-emerald-50 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={handlePlayPause}
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
        >
          {isPlayingThisSurah && playing ? '⏸️ বিরাম' : '▶️ শুরু করুন'}
        </button>
        {isPlayingThisSurah && (
          <>
            <button onClick={previous} className="text-primary text-xl">⏮️</button>
            <button onClick={next} className="text-primary text-xl">⏭️</button>
            <button onClick={handleStop} className="text-primary text-xl">⏹️</button>
            <button onClick={toggleRepeat} className="text-primary text-xl">
              {repeatIcon[repeatMode]}
            </button>
            <div className="flex-1 min-w-[200px]">
              <div className="h-2 bg-softGray rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                আয়াত {currentAyahIndex + 1} / {surah.ayahs.length}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SurahAudioControls