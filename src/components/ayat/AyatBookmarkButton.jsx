import { useBookmark } from '../../context/BookmarkContext'
import { useToast } from '../../context/ToastContext'

const AyatBookmarkButton = ({ ayahId, ayahData }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmark()
  const { showToast } = useToast()
  const bookmarked = isBookmarked('ayah', ayahId)

  const toggle = () => {
    if (bookmarked) {
      removeBookmark('ayah', ayahId)
      showToast('বুকমার্ক সরানো হয়েছে', 'info')
    } else {
      addBookmark('ayah', { id: ayahId, ...ayahData })
      showToast('বুকমার্ক করা হয়েছে', 'success')
    }
  }

  return (
    <button onClick={toggle} className="text-sm text-gray-500 hover:text-primary">
      {bookmarked ? '★ বুকমার্ক করা হয়েছে' : '☆ বুকমার্ক'}
    </button>
  )
}

export default AyatBookmarkButton