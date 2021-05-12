import { useAppSelector } from '@store/hooks'
import { getIsRegistered, getIsAuthenticated, getIsConfirmed } from '@store/auth/selectors'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuthenticated = () => {
  const router = useRouter()
  const { pathname } = useRouter()
  const isRegistered = useAppSelector(getIsRegistered)
  const isAuth = useAppSelector(getIsAuthenticated)
  const isConfirmed = useAppSelector(getIsConfirmed)
  const profilePath = ESRoutes.REGISTER_PROFILE

  useEffect(() => {
    if (!isAuth) {
      router.push(ESRoutes.LOGIN)
    } else if (isAuth && !isRegistered) {
      router.push(profilePath)
    } else if (pathname === profilePath && isConfirmed) {
      router.push(ESRoutes.HOME)
    }
  }, [isAuth, isRegistered])

  return { isAuth }
}

export default useAuthenticated
