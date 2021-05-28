import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAuthenticated = () => {
  const router = useRouter()
  const isAuth = useAppSelector(getIsAuthenticated)

  useEffect(() => {
    if (!isAuth) {
      router.push(ESRoutes.HOME)
    }
  }, [isAuth])

  return { isAuth }
}

export default useAuthenticated
