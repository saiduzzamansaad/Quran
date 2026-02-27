import { createContext, useContext, useState, useRef } from 'react'
import { useToast } from './ToastContext'

const AudioContext = createContext()

export const useAudio = () => useContext(AudioContext)

export const AudioProvider = ({ children }) => {
  const [currentAyah, setCurrentAyah] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(new Audio())
  const { showToast } = useToast()

  const playAyah = (ayahKey, audioUrl) => {
    if (currentAyah !== ayahKey) {
      audioRef.current.src = audioUrl
      setCurrentAyah(ayahKey)
    }
    audioRef.current.play()
      .catch(err => {
        showToast('অডিও চালানো যায়নি', 'error')
        console.error(err)
      })
    setPlaying(true)
  }

  const pauseAyah = () => {
    audioRef.current.pause()
    setPlaying(false)
  }

  const stopAyah = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setPlaying(false)
    setCurrentAyah(null)
  }

  audioRef.current.ontimeupdate = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0)
  }

  audioRef.current.onerror = () => {
    showToast('অডিও লোড হয়নি', 'error')
    setPlaying(false)
  }

  return (
    <AudioContext.Provider value={{ currentAyah, playing, progress, playAyah, pauseAyah, stopAyah }}>
      {children}
    </AudioContext.Provider>
  )
}