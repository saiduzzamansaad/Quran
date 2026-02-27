import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggle)
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return visible ? (
    <button
      onClick={scrollTop}
      className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition"
    >
      ↑
    </button>
  ) : null
}

export default ScrollToTop