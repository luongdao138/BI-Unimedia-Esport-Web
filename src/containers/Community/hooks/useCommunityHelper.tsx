import { useRouter } from 'next/router'
import { ROLE } from '@constants/community.constants'
import { ESRoutes } from '@constants/route.constants'
import { useContextualRouting } from 'next-use-contextual-routing'

const useCommunityHelper = (tournament?: {
  id: number
  attributes: {
    title: string
    cover: string
    hash_key: string
    my_role: string | null
  }
}): {
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
  const isModerator = myRole === ROLE.ADMIN
  // TODO check is canceled on isEditable
  const isEditable = isModerator

  const toCreate = () => router.push(makeContextualHref({ pathName: '/community/create' }), '/community/create', { shallow: true })

  const toEdit = () =>
    router.push(makeContextualHref({ community_id: hashKey }), `/community/${hashKey}/edit`, {
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
