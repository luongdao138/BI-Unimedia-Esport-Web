import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useClearCookies = () => {
  const [, , removeCookie] = useCookies(['loginType', 'redirectTo'])
  const { pathname } = useRouter()
  useEffect(() => {
    switch (pathname) {
      case ESRoutes.REGISTER:
      case ESRoutes.LOGIN:
      case ESRoutes.TWITTER_CALLBACK:
      case ESRoutes.LINE_CALLBACK:
        break
      default:
        clearCookies()
        break
    }
  }, [])
  const clearCookies = () => {
    removeCookie('loginType')
    removeCookie('redirectTo')
  }
}

export default useClearCookies
