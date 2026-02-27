import { copyToClipboard } from '../../utils/copyToClipboard'
import { formatAyatForShare } from '../../utils/formatAyat'
import { useToast } from '../../context/ToastContext'

const AyatActions = ({ ayah, surahName }) => {
  const { showToast } = useToast()
  const shareText = formatAyatForShare(ayah.text, ayah.translation, surahName, ayah.numberInSurah)

  const copy = async () => {
    const success = await copyToClipboard(shareText)
    if (success) showToast('কপি হয়েছে!', 'success')
    else showToast('কপি ব্যর্থ', 'error')
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: 'কুরআনের আয়াত', text: shareText })
        .catch(() => showToast('শেয়ার ব্যর্থ', 'error'))
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
    }
  }

  return (
    <div className="flex gap-2 text-sm">
      <button onClick={copy} className="text-gray-500 hover:text-primary">📋 কপি</button>
      <button onClick={share} className="text-gray-500 hover:text-primary">📤 শেয়ার</button>
    </div>
  )
}

export default AyatActions