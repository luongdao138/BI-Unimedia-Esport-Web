import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReturnHref = () => {
  const router = useRouter()
  const { returnHref, makeContextualHref } = useContextualRouting()
  const handleReturn = () => (router.query._UCR_return_href ? router.push(returnHref, undefined, { shallow: true }) : router.back())
  const navigateScreen = (pathName: string) => {
    return router.query._UCR_return_href
      ? router.push(makeContextualHref({ pathName }), pathName, { shallow: true })
      : router.push(pathName)
  }
  const handleLink = (pathName: string) => {
    return router.query._UCR_return_href ? makeContextualHref({ pathName: pathName }) : pathName
  }

  return { handleReturn, navigateScreen, handleLink }
}

export default useReturnHref
