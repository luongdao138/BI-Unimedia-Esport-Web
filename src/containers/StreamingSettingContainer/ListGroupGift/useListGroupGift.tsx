import { useContextualRouting } from 'next-use-contextual-routing'
import { useRouter } from 'next/router'

const useListGroupGift = () => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const toListGroupGift = () => router.push(makeContextualHref({ modalName: 'list_group_gift' }), `${router.pathname}`, { shallow: true })

  return {
    toListGroupGift,
  }
}
export default useListGroupGift
