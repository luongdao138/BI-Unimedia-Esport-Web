import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'
import { RouteContext } from 'pages/_app'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getIsRegistered } from '@store/auth/selectors'
import auth from '@store/auth'

const { actions: authActions } = auth

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReturnHref = () => {
  const router = useRouter()
  const isRegistered = useAppSelector(getIsRegistered)
  const { returnHref, makeContextualHref } = useContextualRouting()
  const { previousRoute } = useContext(RouteContext)
  const dispatch = useAppDispatch()

  const handleReturn = () => router.back()
  const navigateScreen = (pathName: string) => {
    return router.query._UCR_return_href
      ? router.push(makeContextualHref({ pathName }), pathName, { shallow: true })
      : router.push(pathName)
  }
  const handleLink = (pathName: string) => {
    return router.query._UCR_return_href ? makeContextualHref({ pathName: pathName }) : pathName
  }
  const handleLogin = () => {
    if (previousRoute === ESRoutes.TOP) {
      router.push(ESRoutes.HOME)
    } else if (previousRoute === ESRoutes.VIDEO_TOP) {
      router.push(returnHref, undefined, { shallow: true })
      const { favoriteTabClick } = router.query
      if (favoriteTabClick) {
        dispatch(authActions.setLoginPreAction({ action: 'favorite_tab' }))
      }
    } else if (!isRegistered) {
      router.push(ESRoutes.REGISTER_PROFILE)
    } else {
      router.push(returnHref, undefined, { shallow: true })
    }
  }
  return { handleReturn, navigateScreen, handleLink, handleLogin, hasUCRReturnHref: !!router.query._UCR_return_href }
}

export default useReturnHref
