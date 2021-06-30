import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const EXCEPTIONS = [
  '/login',
  '/register ',
  '/register/',
  '/register/confirm',
  '/register/profile',
  '/user-settings',
  '/forgot-password',
  '/forgot-password/confirm',
  '/forgot-password/reset',
  '/message/[id]',
  '/message/create',
  '/message/dm/[id]',
]

const useRouteUrlHistory = (): { previousRoute: string } => {
  const [previousRoute, setPreviousRouter] = useState('')
  const router = useRouter()

  const handleHistoryChange = (url: string) => {
    if (!EXCEPTIONS.includes(url)) {
      setPreviousRouter(router.asPath)
    }
  }

  useEffect(() => {
    handleHistoryChange(router.pathname)
  }, [router.pathname])

  return { previousRoute }
}

export default useRouteUrlHistory
