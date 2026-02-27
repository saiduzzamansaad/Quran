import AyatCard from './AyatCard'

const AyatList = ({ ayahs, surahName }) => {
  return (
    <div className="space-y-2">
      {ayahs.map(ayah => <AyatCard key={ayah.number} ayah={ayah} surahName={surahName} />)}
    </div>
  )
}

export default AyatList