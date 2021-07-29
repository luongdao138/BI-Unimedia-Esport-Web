import { useAppSelector } from '@store/hooks'
import { getIsRegistered, getIsAuthenticated } from '@store/auth/selectors'
import { useEffect } from 'react'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from './useReturnHref'

const useProfileValid = () => {
  const { navigateScreen } = useReturnHref()
  const isRegistered = useAppSelector(getIsRegistered)
  const isAuth = useAppSelector(getIsAuthenticated)

  useEffect(() => {
    if (isAuth && !isRegistered) navigateScreen(ESRoutes.REGISTER_PROFILE)
  }, [isAuth, isRegistered])

  return { isAuth, isValidProfile: isAuth && !isRegistered }
}

export default useProfileValid
