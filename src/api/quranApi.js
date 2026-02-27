import axiosInstance from './axiosInstance'
import { ENDPOINTS } from './endpoints'

export const fetchSurahList = async () => {
  const response = await axiosInstance.get(ENDPOINTS.SURAH_LIST)
  return response.data.data
}

export const fetchSurahDetailsArabic = async (surahNumber) => {
  const response = await axiosInstance.get(`/surah/${surahNumber}/quran-uthmani`)
  return response.data.data
}

export const fetchSurahDetailsBangla = async (surahNumber) => {
  const response = await axiosInstance.get(`/surah/${surahNumber}/bn.bengali`)
  return response.data.data
}

export const searchQuran = async (keyword) => {
  const response = await axiosInstance.get(ENDPOINTS.SEARCH(keyword))
  return response.data.data
}