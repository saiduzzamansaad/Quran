import { useState, useEffect } from 'react'
import { searchQuran } from '../api/quranApi'
import Container from '../components/layout/Container'
import SearchBar from '../components/search/SearchBar'
import SearchResults from '../components/search/SearchResults'
import Loader from '../components/ui/Loader'
import { useDebounce } from '../hooks/useDebounce'

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }
    setLoading(true)
    searchQuran(debouncedQuery)
      .then(data => setResults(data.matches || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-4">আয়াত অনুসন্ধান</h1>
      <SearchBar onSearch={setQuery} />
      {loading && <Loader />}
      {!loading && <SearchResults results={results} />}
    </Container>
  )
}

export default SearchPage