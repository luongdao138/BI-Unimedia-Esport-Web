import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'
import { RouteContext } from 'pages/_app'
import { useAppSelector } from '@store/hooks'
import { getIsRegistered } from '@store/auth/selectors'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReturnHref = () => {
  const router = useRouter()
  const isRegistered = useAppSelector(getIsRegistered)
  const { returnHref, makeContextualHref } = useContextualRouting()
  const { previousRoute } = useContext(RouteContext)

  const handleReturn = () => {
    // eslint-disable-next-line no-console
    console.log('backToTopVideo::back::18')
    router.back()
  }
  const navigateScreen = (pathName: string) => {
    return router.query._UCR_return_href
      ? router.push(makeContextualHref({ pathName }), pathName, { shallow: true })
      : router.push(pathName)
  }
  const handleLink = (pathName: string) => {
    return router.query._UCR_return_href ? makeContextualHref({ pathName: pathName }) : pathName
  }
  const handleLogin = () => {
    // eslint-disable-next-line no-console
    console.log('backToTopVideo::handleLogin')
    // eslint-disable-next-line no-console
    console.log('backToTopVideo::returnHref', returnHref)
    // eslint-disable-next-line no-console
    console.log('router.query', router.query)
    if (previousRoute === ESRoutes.TOP) {
      router.push(ESRoutes.HOME)
    } else if (previousRoute === ESRoutes.VIDEO_TOP) {
      // [CW] Active tab favorite when user click on favorite tab then login successfully from video top screen.
      const { favoriteTabClick } = router.query
      // eslint-disable-next-line no-console
      console.log('backToTopVideo::direct::4')
      if (favoriteTabClick) {
        router.push(
          {
            pathname: returnHref,
            search: favoriteTabClick ? '?default_tab=4' : '',
          },
          ESRoutes.VIDEO_TOP,
          { shallow: true }
        )
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
