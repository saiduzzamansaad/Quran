import { useQuran } from '../context/QuranContext'
import Container from '../components/layout/Container'
import SurahList from '../components/surah/SurahList'
import Loader from '../components/ui/Loader'

const Home = () => {
  const { surahList, loading, error } = useQuran()

  if (loading) return <Container><Loader /></Container>
  if (error) return <Container><p className="text-red-500">ত্রুটি: {error}</p></Container>

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-6">সূরা সমূহ</h1>
      <SurahList surahs={surahList} />
    </Container>
  )
}

export default Home