import { Link } from 'react-router-dom'

const SurahCard = ({ surah }) => {
  return (
    <Link to={`/surah/${surah.number}`}>
      <div className="bg-white border border-softGray rounded-lg p-4 hover:shadow-md transition cursor-pointer">
        <div className="flex items-start justify-between">
          <span className="text-lg font-arabic">{surah.name}</span>
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{surah.number}</span>
        </div>
        <p className="text-gray-600 mt-1">{surah.englishName} – {surah.englishNameTranslation}</p>
        <div className="flex gap-2 mt-2 text-xs text-gray-500">
          <span>{surah.revelationType}</span>
          <span>•</span>
          <span>{surah.numberOfAyahs} আয়াত</span>
        </div>
      </div>
    </Link>
  )
}

export default SurahCard