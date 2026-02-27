import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QuranProvider } from './context/QuranContext'
import { BookmarkProvider } from './context/BookmarkContext'
import { AudioProvider } from './context/AudioContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import Loader from './components/ui/Loader'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const SurahDetails = lazy(() => import('./pages/SurahDetails'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <ToastProvider>
      <QuranProvider>
        <BookmarkProvider>
          <AudioProvider>
            <div className="min-h-screen bg-white">
              <Navbar />
              <main className="pt-16">
                <Suspense fallback={<div className="py-8"><Loader /></div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/surah/:id" element={<SurahDetails />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/bookmarks" element={<Bookmarks />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </AudioProvider>
        </BookmarkProvider>
      </QuranProvider>
    </ToastProvider>
  )
}

export default App