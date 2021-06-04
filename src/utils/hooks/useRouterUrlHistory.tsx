import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// const EXCEPTIONS = [] improve later

const useRouteUrlHistory = (): { previousRoute: string } => {
  const [previousRoute, setPreviousRouter] = useState('')
  const router = useRouter()

  const handleBeforeHistoryChange = (_url: string) => {
    setPreviousRouter(router.asPath)
  }

  useEffect(() => {
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange)

    return () => {
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange)
    }
  }, [])

  return { previousRoute }
}

export default useRouteUrlHistory
