const SearchResults = ({ results }) => {
      if (!results || results.length === 0) return <p className="text-center py-8">কোন ফলাফল পাওয়া যায়নি</p>
    
      return (
        <div className="space-y-4">
          {results.map(match => (
            <div key={match.number} className="border p-4 rounded-lg">
              <p className="text-right text-xl font-arabic" dir="rtl">{match.text}</p>
              <p className="text-gray-700 mt-2">{match.translation}</p>
              <p className="text-sm text-primary mt-1">সূরা {match.surah.name}, আয়াত {match.numberInSurah}</p>
            </div>
          ))}
        </div>
      )
    }
    
    export default SearchResults