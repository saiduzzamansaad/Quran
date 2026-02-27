import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { fetchSurahList } from '../api/quranApi'
import { useLocalStorage } from '../hooks/useLocalStorage'

const QuranContext = createContext()

export const useQuran = () => useContext(QuranContext)

const CACHE_KEY = 'surahList'
const CACHE_EXPIRY = 1000 * 60 * 60 * 24 // 24 hours

export const QuranProvider = ({ children }) => {
  const [surahList, setSurahList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recentlyViewed', [])

  useEffect(() => {
    const loadSurahList = async () => {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setSurahList(data)
          setLoading(false)
          return
        }
      }
      setLoading(true)
      try {
        const data = await fetchSurahList()
        setSurahList(data)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadSurahList()
  }, [])

  const addToRecentlyViewed = useCallback((surah) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s.number !== surah.number)
      return [surah, ...filtered].slice(0, 5)
    })
  }, [setRecentlyViewed])

  const value = useMemo(() => ({
    surahList,
    loading,
    error,
    recentlyViewed,
    addToRecentlyViewed
  }), [surahList, loading, error, recentlyViewed, addToRecentlyViewed])

  return (
    <QuranContext.Provider value={value}>
      {children}
    </QuranContext.Provider>
  )
}