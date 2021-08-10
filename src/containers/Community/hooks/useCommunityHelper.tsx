import { useRouter } from 'next/router'
import { LobbyDetail } from '@services/lobby.service'
import { ROLE, COMMUNITY_STATUS } from '@constants/community.constants'
import { ESRoutes } from '@constants/route.constants'
import { useContextualRouting } from 'next-use-contextual-routing'

const useCommunityHelper = (
  tournament?: LobbyDetail
): {
  isModerator: boolean
  isEditable: boolean
  toEdit: () => void
  toCreate: () => void
  toDetail: () => void
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hashKey = tournament?.attributes?.hash_key
  const myRole = tournament?.attributes?.my_role
  const status = tournament?.attributes?.status
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isEditable = isModerator && status !== COMMUNITY_STATUS.CANCELLED

  const toCreate = () => router.push(makeContextualHref({ pathName: '/community/create' }), '/community/create', { shallow: true })
  const toEdit = () =>
    router.push(makeContextualHref({ hash_key: hashKey }), `/community/${hashKey}/edit`, {
      shallow: true,
    })

  const toDetail = () => {
    router.push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, hashKey))
  }

  return {
    isModerator,
    isEditable,
    toEdit,
    toCreate,
    toDetail,
  }
}

export default useCommunityHelper
