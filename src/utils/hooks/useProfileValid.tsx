import { useAppSelector } from '@store/hooks'
import { getIsRegistered, getIsAuthenticated } from '@store/auth/selectors'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProfileValid = () => {
  const router = useRouter()
  const isRegistered = useAppSelector(getIsRegistered)
  const isAuth = useAppSelector(getIsAuthenticated)

  useEffect(() => {
    if (isAuth && !isRegistered) router.push(ESRoutes.REGISTER_PROFILE)
  }, [isAuth, isRegistered])

  return { isAuth }
}

export default useProfileValid
