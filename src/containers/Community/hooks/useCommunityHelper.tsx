import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { CommunityDetail } from '@services/community.service'

const useCommunityHelper = (
  community?: CommunityDetail
): {
  toEdit: () => void
  toCreate: () => void
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hash_key = community?.id

  const toCreate = () => router.push(makeContextualHref({ pathName: '/community/create' }), '/community/create', { shallow: true })

  const toEdit = () => {
    router.push(makeContextualHref({ community_id: hash_key }), `/community/${hash_key}/edit`, {
      shallow: true,
    })
  }

  return {
    toEdit,
    toCreate,
  }
}

export default useCommunityHelper
