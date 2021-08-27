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
  isNotMember: boolean
  isAutomatic: boolean
  isPublic: boolean
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hash_key = community?.attributes.hash_key
  const myRole = community?.attributes?.my_role
  const isModerator = myRole == MEMBER_ROLE.ADMIN || myRole == MEMBER_ROLE.CO_ORGANIZER
  const isNotMember = myRole == null || myRole == MEMBER_ROLE.REQUESTED || myRole == MEMBER_ROLE.LEAVE
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
    isNotMember,
    isAutomatic,
    isPublic,
  }
}

export default useCommunityHelper
