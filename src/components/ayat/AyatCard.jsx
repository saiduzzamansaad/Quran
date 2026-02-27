import { useBookmark } from '../../context/BookmarkContext'
import { useAudio } from '../../context/AudioContext'
import { useToast } from '../../context/ToastContext'
import AyatBookmarkButton from './AyatBookmarkButton'
import AyatActions from './AyatActions'
import { toArabicNumber } from '../../utils/arabicNumber'

const AyatCard = ({ ayah, surahName, surah }) => {
  const { isBookmarked } = useBookmark()
  const { playAyah, pause, playing, currentAyah, currentSurah, currentAyahIndex } = useAudio()
  const { showToast } = useToast()
  const ayahId = `${surahName}-${ayah.number}`
  const isPlaying = currentAyah === ayahId && playing
  const isCurrentSurah = currentSurah?.number === surah?.number

  const handlePlay = () => {
    if (isPlaying) {
      pause()
    } else {
      // If this ayah is part of current surah and we have index, use that
      if (isCurrentSurah && currentSurah) {
        const index = currentSurah.ayahs.findIndex(a => a.number === ayah.number)
        if (index !== -1) {
          playAyah(ayahId, ayah.audio, currentSurah, index)
          return
        }
      }
      // Otherwise just play this ayah standalone
      playAyah(ayahId, ayah.audio)
    }
  }

  return (
    <div className="border-b border-softGray py-4 last:border-0">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium">
          {toArabicNumber(ayah.numberInSurah)}
        </span>
        <div className="flex-1">
          <p className="text-right text-2xl font-arabic leading-loose mb-2" dir="rtl">{ayah.text}</p>
          <p className="text-gray-700 mb-2">{ayah.translation}</p>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={handlePlay} className="text-primary hover:underline text-sm">
              {isPlaying ? '⏸️ থামান' : '🔊 শুনুন'}
            </button>
            <AyatBookmarkButton ayahId={ayahId} ayahData={{ text: ayah.text, translation: ayah.translation, surahName, ayahNumber: ayah.numberInSurah }} />
            <AyatActions ayah={ayah} surahName={surahName} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AyatCard