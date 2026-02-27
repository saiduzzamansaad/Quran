import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchSurahDetailsArabic, fetchSurahDetailsBangla } from '../api/quranApi'
import { useQuran } from '../context/QuranContext'
import { useToast } from '../context/ToastContext'
import Container from '../components/layout/Container'
import SurahInfo from '../components/surah/SurahInfo'
import AyatList from '../components/ayat/AyatList'
import Loader from '../components/ui/Loader'

const CACHE_PREFIX = 'surah_'

const SurahDetails = () => {
  const { id } = useParams()
  const { addToRecentlyViewed } = useQuran()
  const { showToast } = useToast()
  const [surahData, setSurahData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cacheKey = CACHE_PREFIX + id
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      // Cache for 24 hours
      if (Date.now() - timestamp < 86400000) {
        setSurahData(data)
        setLoading(false)
        addToRecentlyViewed(data)
        return
      }
    }

    const loadSurah = async () => {
      setLoading(true)
      try {
        const [arabicEdition, banglaEdition] = await Promise.all([
          fetchSurahDetailsArabic(id),
          fetchSurahDetailsBangla(id)
        ])
        const mergedAyahs = arabicEdition.ayahs.map((arabic, index) => ({
          number: arabic.number,
          numberInSurah: arabic.numberInSurah,
          text: arabic.text,
          translation: banglaEdition.ayahs[index].text,
          juz: arabic.juz,
          audio: `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${arabic.number}`,
        }))
        const surahInfo = {
          ...arabicEdition,
          ayahs: mergedAyahs,
          translation: banglaEdition.name,
        }
        setSurahData(surahInfo)
        addToRecentlyViewed(surahInfo)
        localStorage.setItem(cacheKey, JSON.stringify({ data: surahInfo, timestamp: Date.now() }))
      } catch (err) {
        setError(err.message)
        showToast('সূরা লোড করতে সমস্যা', 'error')
      } finally {
        setLoading(false)
      }
    }
    loadSurah()
  }, [id, addToRecentlyViewed, showToast])

  if (loading) return <Container><Loader /></Container>
  if (error) return <Container><p className="text-red-500">ত্রুটি: {error}</p></Container>
  if (!surahData) return null

  return (
    <Container className="py-8">
      <SurahInfo surah={surahData} />
      <AyatList ayahs={surahData.ayahs} surahName={surahData.englishName} />
    </Container>
  )
}

export default SurahDetails