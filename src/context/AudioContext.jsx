import { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useToast } from './ToastContext'

const AudioContext = createContext()

export const useAudio = () => useContext(AudioContext)

export const AudioProvider = ({ children }) => {
  const [currentSurah, setCurrentSurah] = useState(null) // { number, ayahs, name }
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [repeatMode, setRepeatMode] = useState('none') // 'none', 'one', 'all'
  const audioRef = useRef(new Audio())
  const { showToast } = useToast()

  // Play specific ayah
  const playAyah = useCallback((ayahKey, audioUrl, surah = null, index = null) => {
    if (surah && index !== null) {
      setCurrentSurah(surah)
      setCurrentAyahIndex(index)
    }
    if (currentSurah && currentAyahIndex !== null) {
      // Update src only if different
      const newSrc = audioUrl || currentSurah.ayahs[currentAyahIndex].audio
      if (audioRef.current.src !== newSrc) {
        audioRef.current.src = newSrc
      }
    } else {
      audioRef.current.src = audioUrl
    }
    audioRef.current.play()
      .catch(err => {
        showToast('অডিও চালানো যায়নি', 'error')
        console.error(err)
      })
    setPlaying(true)
  }, [currentSurah, currentAyahIndex, showToast])

  // Play entire surah
  const playSurah = useCallback((surah) => {
    setCurrentSurah(surah)
    setCurrentAyahIndex(0)
    const firstAyah = surah.ayahs[0]
    audioRef.current.src = firstAyah.audio
    audioRef.current.play()
      .catch(err => {
        showToast('অডিও চালানো যায়নি', 'error')
        console.error(err)
      })
    setPlaying(true)
  }, [showToast])

  // Pause
  const pause = useCallback(() => {
    audioRef.current.pause()
    setPlaying(false)
  }, [])

  // Resume
  const resume = useCallback(() => {
    audioRef.current.play()
      .catch(err => {
        showToast('অডিও চালানো যায়নি', 'error')
        console.error(err)
      })
    setPlaying(true)
  }, [showToast])

  // Stop
  const stop = useCallback(() => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setPlaying(false)
    setCurrentSurah(null)
    setCurrentAyahIndex(0)
  }, [])

  // Next ayah (if in surah mode)
  const next = useCallback(() => {
    if (currentSurah && currentAyahIndex < currentSurah.ayahs.length - 1) {
      const nextIndex = currentAyahIndex + 1
      setCurrentAyahIndex(nextIndex)
      audioRef.current.src = currentSurah.ayahs[nextIndex].audio
      audioRef.current.play()
        .catch(err => {
          showToast('অডিও চালানো যায়নি', 'error')
          console.error(err)
        })
    } else if (repeatMode === 'all' && currentSurah) {
      // Loop surah
      setCurrentAyahIndex(0)
      audioRef.current.src = currentSurah.ayahs[0].audio
      audioRef.current.play()
    } else {
      stop()
    }
  }, [currentSurah, currentAyahIndex, repeatMode, stop])

  // Previous ayah
  const previous = useCallback(() => {
    if (currentSurah && currentAyahIndex > 0) {
      const prevIndex = currentAyahIndex - 1
      setCurrentAyahIndex(prevIndex)
      audioRef.current.src = currentSurah.ayahs[prevIndex].audio
      audioRef.current.play()
        .catch(err => {
          showToast('অডিও চালানো যায়নি', 'error')
          console.error(err)
        })
    }
  }, [currentSurah, currentAyahIndex])

  // Repeat mode toggle
  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'none') return 'one'
      if (prev === 'one') return 'all'
      return 'none'
    })
  }, [])

  // Handle audio end
  useEffect(() => {
    const handleEnded = () => {
      if (repeatMode === 'one') {
        // Replay current ayah
        audioRef.current.currentTime = 0
        audioRef.current.play()
      } else {
        next()
      }
    }
    audioRef.current.addEventListener('ended', handleEnded)
    return () => audioRef.current.removeEventListener('ended', handleEnded)
  }, [repeatMode, next])

  // Update progress
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
      }
    }
    audioRef.current.addEventListener('timeupdate', updateProgress)
    return () => audioRef.current.removeEventListener('timeupdate', updateProgress)
  }, [])

  // Error handling
  useEffect(() => {
    const handleError = () => {
      showToast('অডিও লোড হয়নি', 'error')
      setPlaying(false)
    }
    audioRef.current.addEventListener('error', handleError)
    return () => audioRef.current.removeEventListener('error', handleError)
  }, [showToast])

  const value = useMemo(() => ({
    currentSurah,
    currentAyahIndex,
    playing,
    progress,
    repeatMode,
    playAyah,
    playSurah,
    pause,
    resume,
    stop,
    next,
    previous,
    toggleRepeat
  }), [currentSurah, currentAyahIndex, playing, progress, repeatMode, playAyah, playSurah, pause, resume, stop, next, previous, toggleRepeat])

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}