import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { CommunityDetail } from '@services/community.service'
import { JOIN_CONDITION, OPEN_RANGE, MEMBER_ROLE, OFFICIAL } from '@constants/community.constants'
import { ESRoutes } from '@constants/route.constants'

const useCommunityHelper = (
  community?: CommunityDetail
): {
  toEdit: () => void
  toCreate: () => void
  toCreateTopic: () => void
  isModerator: boolean
  isNotMember: boolean
  isAutomatic: boolean
  isPublic: boolean
  isOfficial: boolean
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hash_key = community?.attributes.hash_key
  const myRole = community?.attributes?.my_role
  const isModerator = myRole == MEMBER_ROLE.ADMIN || myRole == MEMBER_ROLE.CO_ORGANIZER
  const isNotMember = myRole == null || myRole == MEMBER_ROLE.REQUESTED || myRole == MEMBER_ROLE.LEAVE
  const isAutomatic = community?.attributes?.join_condition == JOIN_CONDITION.AUTOMATIC
  const isPublic = community?.attributes?.open_range == OPEN_RANGE.SEARCHABLE
  const isOfficial = community?.attributes?.is_official == OFFICIAL.OFFICIAL

  const toCreate = () => router.push(makeContextualHref({ pathName: '/community/create' }), '/community/create', { shallow: true })

  const toEdit = () => {
    router.push(makeContextualHref({ hash_key: hash_key }), `/community/${hash_key}/edit`, {
      shallow: true,
    })
  }

  const toCreateTopic = () => {
    router.push(makeContextualHref({ hash_key: hash_key }), ESRoutes.TOPIC_CREATE.replace(/:id/, hash_key), {
      shallow: true,
    })
  }

  return {
    toEdit,
    toCreate,
    toCreateTopic,
    isModerator,
    isNotMember,
    isAutomatic,
    isPublic,
    isOfficial,
  }
}

export default useCommunityHelper
