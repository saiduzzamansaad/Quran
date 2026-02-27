export const ENDPOINTS = {
      SURAH_LIST: '/surah',
      SURAH_DETAILS: (surahNumber) => `/surah/${surahNumber}/editions/quran-uthmani,bn.bengali`,
      AYAH_AUDIO: (ayahKey) => `/ayah/${ayahKey}/ar.alafasy`,
      SEARCH: (keyword) => `/search/${keyword}/all/bn.bengali`,
    }