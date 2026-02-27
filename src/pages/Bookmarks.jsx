import { useBookmark } from '../context/BookmarkContext'
import Container from '../components/layout/Container'

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmark()
  const ayahBookmarks = Object.values(bookmarks.ayah || {})

  if (ayahBookmarks.length === 0) {
    return <Container className="py-8 text-center">কোন বুকমার্ক নেই</Container>
  }

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-4">আমার বুকমার্ক</h1>
      <div className="space-y-4">
        {ayahBookmarks.map(item => (
          <div key={item.id} className="border p-4 rounded-lg bg-white">
            <p className="text-right text-xl font-arabic" dir="rtl">{item.text}</p>
            <p className="text-gray-700 mt-2">{item.translation}</p>
            <p className="text-sm text-primary mt-1">{item.surahName} – আয়াত {item.ayahNumber}</p>
            <button onClick={() => removeBookmark('ayah', item.id)} className="text-red-500 text-sm mt-2">অপসারণ</button>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Bookmarks