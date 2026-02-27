import AyatCard from './AyatCard'

const AyatList = ({ ayahs, surahName, surah }) => {
  return (
    <div className="space-y-2">
      {ayahs.map(ayah => (
        <AyatCard key={ayah.number} ayah={ayah} surahName={surahName} surah={surah} />
      ))}
    </div>
  )
}

export default AyatList