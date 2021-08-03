import { useContextualRouting } from 'next-use-contextual-routing'
import { useRouter } from 'next/router'

const useLobbyHelper = (): {
  toCreate: () => void
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const toCreate = () => router.push(makeContextualHref({ pathName: '/lobby/create' }), '/lobby/create', { shallow: true })

  return {
    toCreate,
  }
}

export default useLobbyHelper
