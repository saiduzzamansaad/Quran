const SurahInfo = ({ surah }) => {
      return (
        <div className="bg-emerald-50 rounded-lg p-6 mb-6 text-center">
          <h1 className="text-3xl font-arabic mb-2">{surah.name}</h1>
          <p className="text-xl">{surah.englishName} – {surah.englishNameTranslation}</p>
          <div className="flex justify-center gap-4 mt-3 text-sm text-gray-600">
            <span>অবতরণ: {surah.revelationType === 'Meccan' ? 'মক্কী' : 'মাদানী'}</span>
            <span>•</span>
            <span>আয়াত: {surah.numberOfAyahs}</span>
            <span>•</span>
            <span>পারা: {surah.ayahs?.[0]?.juz || '-'}</span>
          </div>
        </div>
      )
    }
    
    export default SurahInfo