import { useState, useEffect } from 'react'

export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetchFunction()
      .then(res => isMounted && setData(res))
      .catch(err => isMounted && setError(err.message))
      .finally(() => isMounted && setLoading(false))
    return () => { isMounted = false }
  }, dependencies)

  return { data, loading, error }
}