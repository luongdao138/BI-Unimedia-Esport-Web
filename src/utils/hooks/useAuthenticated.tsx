import { useAppSelector } from '@store/hooks'
import { getIsRegistered, getIsAuthenticated } from '@store/auth/selectors'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuthenticated = () => {
  const router = useRouter()
  const isRegistered = useAppSelector(getIsRegistered)
  const isAuth = useAppSelector(getIsAuthenticated)

  useEffect(() => {
    if (isAuth && !isRegistered) {
      router.push(ESRoutes.PROFILE)
    }
  }, [isAuth, isRegistered])
}

export default useAuthenticated
