import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'
import { RouteContext } from 'pages/_app'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReturnHref = () => {
  const router = useRouter()
  const { returnHref, makeContextualHref } = useContextualRouting()
  const { previousRoute } = useContext(RouteContext)

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
    } else {
      router.push(returnHref, undefined, { shallow: true })
    }
  }

  return { handleReturn, navigateScreen, handleLink, handleLogin }
}

export default useReturnHref
