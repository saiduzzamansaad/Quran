import { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 600)

  // Trigger search when debouncedQuery changes
  // (we'll call onSearch from parent effect)
  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="আয়াতের কীওয়ার্ড লিখুন (বাংলায়)..."
      className="w-full p-3 border border-softGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}

export default SearchBar