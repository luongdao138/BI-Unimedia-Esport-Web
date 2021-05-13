import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReturnHref = () => {
  const router = useRouter()
  const { returnHref, makeContextualHref } = useContextualRouting()
  const handleReturn = () => router.push(returnHref, undefined, { shallow: true })
  const navigateScreen = (pathName: string) => router.push(makeContextualHref({ pathName }), pathName, { shallow: true })
  const handleLink = (pathName: string) => makeContextualHref({ pathName: pathName })

  return { handleReturn, navigateScreen, handleLink }
}

export default useReturnHref
