import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookmarkContext = createContext()

export const useBookmark = () => useContext(BookmarkContext)

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', { ayah: {}, surah: {} })

  const addBookmark = (type, item, category = 'favorite') => {
    setBookmarks(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [item.id]: { ...item, category }
      }
    }))
  }

  const removeBookmark = (type, id) => {
    setBookmarks(prev => {
      const updated = { ...prev }
      delete updated[type][id]
      return updated
    })
  }

  const isBookmarked = (type, id) => !!bookmarks[type]?.[id]

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  )
}