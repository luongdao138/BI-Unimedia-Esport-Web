import { useEffect } from 'react'

export const useShareHash = (hash: string | undefined | null): string => {
  const path = typeof window !== 'undefined' ? window.location.href : ''
  useEffect(() => {
    if (hash) {
      const cleanUrl = path.split('#')[0]
      window.location.href = cleanUrl + '#' + hash
    }
  }, [hash])
  return path
}
