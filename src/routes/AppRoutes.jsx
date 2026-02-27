import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SurahDetails from '../pages/SurahDetails'
import SearchPage from '../pages/SearchPage'
import Bookmarks from '../pages/Bookmarks'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/surah/:id" element={<SurahDetails />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes