import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReturnHref = () => {
  const router = useRouter()
  const { returnHref, makeContextualHref } = useContextualRouting()
  const handleReturn = () => router.back()
  const navigateScreen = (pathName: string) => {
    return router.query._UCR_return_href
      ? router.push(makeContextualHref({ pathName }), pathName, { shallow: true })
      : router.push(pathName)
  }
  const handleLink = (pathName: string) => {
    return router.query._UCR_return_href ? makeContextualHref({ pathName: pathName }) : pathName
  }
  const handleLogin = () =>
    router.query._UCR_return_href ? router.push(returnHref, undefined, { shallow: true }) : router.push(ESRoutes.HOME)
  const handleRegister = () =>
    router.query._UCR_return_href
      ? router.push(ESRoutes.REGISTER_PROFILE, undefined, { shallow: true })
      : router.push(ESRoutes.REGISTER_PROFILE)

  return { handleReturn, navigateScreen, handleLink, handleLogin, handleRegister }
}

export default useReturnHref
