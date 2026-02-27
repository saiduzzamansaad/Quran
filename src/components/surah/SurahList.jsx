import SurahCard from './SurahCard'

const SurahList = ({ surahs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map(surah => <SurahCard key={surah.number} surah={surah} />)}
    </div>
  )
}

export default SurahList