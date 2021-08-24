import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { CommunityDetail } from '@services/community.service'
import { JOIN_CONDITION, OPEN_RANGE, MEMBER_ROLE } from '@constants/community.constants'

const useCommunityHelper = (
  community?: CommunityDetail
): {
  toEdit: () => void
  toCreate: () => void
  isModerator: boolean
  isAutomatic: boolean
  isPublic: boolean
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hash_key = community?.id
  const myRole = community?.attributes?.member_role
  const isModerator = myRole == MEMBER_ROLE.ADMIN || myRole == MEMBER_ROLE.CO_ORGANIZER
  const isAutomatic = community?.attributes?.join_condition == JOIN_CONDITION.AUTOMATIC
  const isPublic = community?.attributes?.open_range == OPEN_RANGE.SEARCHABLE

  const toCreate = () => router.push(makeContextualHref({ pathName: '/community/create' }), '/community/create', { shallow: true })

  const toEdit = () => {
    router.push(makeContextualHref({ community_id: hash_key }), `/community/${hash_key}/edit`, {
      shallow: true,
    })
  }

  return {
    toEdit,
    toCreate,
    isModerator,
    isAutomatic,
    isPublic,
  }
}

export default useCommunityHelper
