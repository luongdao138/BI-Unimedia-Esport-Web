import { useRouter } from 'next/router'
import { TournamentDetail } from '@services/arena.service'
import { ROLE, RULE, TOURNAMENT_STATUS } from '@constants/tournament.constants'
import { ESRoutes } from '@constants/route.constants'
import { useContextualRouting } from 'next-use-contextual-routing'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'

const useArenaHelper = (
  tournament?: TournamentDetail
): {
  toMatches: () => void
  toResults: () => void
  toGroupChat: () => void
  isModerator: boolean
  isInProgress: boolean
  isCompleted: boolean
  isRecruitmentClosed: boolean
  isBattleRoyale: boolean
  isRecruiting: boolean
  isTeam: boolean
  isEditable: boolean
  toEdit: () => void
  toCreate: () => void
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hashKey = tournament?.attributes?.hash_key
  const chatRoomId = tournament?.attributes?.chat_room_id
  const myRole = tournament?.attributes?.my_role
  const status = tournament?.attributes?.status
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isInProgress = status === TOURNAMENT_STATUS.IN_PROGRESS
  const isCompleted = status === TOURNAMENT_STATUS.COMPLETED
  const isRecruitmentClosed = status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || status === TOURNAMENT_STATUS.READY_TO_START
  const isBattleRoyale = tournament?.attributes?.rule === RULE.BATTLE_ROYALE
  const isRecruiting = status === TOURNAMENT_STATUS.RECRUITING
  const isTeam = tournament?.attributes?.participant_type > 1
  const isEditable = isModerator && !TournamentHelper.isStatusPassed(status, TOURNAMENT_STATUS.IN_PROGRESS)

  const toCreate = () => router.push(makeContextualHref({ pathName: '/arena/create' }), '/arena/create', { shallow: true })
  const toEdit = () =>
    router.push(makeContextualHref({ hash_key: hashKey }), `/arena/${hashKey}/edit`, {
      shallow: true,
    })

  const toMatches = () => {
    if (isModerator && isRecruitmentClosed) {
      const matchEditRoute = isBattleRoyale ? ESRoutes.ARENA_BATTLES_EDIT : ESRoutes.ARENA_MATCHES_EDIT
      router.push(matchEditRoute.replace(/:id/gi, hashKey))
    } else {
      const matchRoute = isBattleRoyale ? ESRoutes.ARENA_BATTLES : ESRoutes.ARENA_MATCHES
      router.push(matchRoute.replace(/:id/gi, hashKey))
    }
  }

  const toResults = () => {
    router.push(ESRoutes.ARENA_RESULTS.replace(/:id/gi, hashKey))
  }

  const toGroupChat = () => {
    router.push(ESRoutes.GROUP_CHAT.replace(/:id/gi, chatRoomId))
  }

  return {
    toGroupChat,
    toMatches,
    toResults,
    isInProgress,
    isCompleted,
    isRecruitmentClosed,
    isBattleRoyale,
    isModerator,
    isRecruiting,
    isTeam,
    isEditable,
    toEdit,
    toCreate,
  }
}

export default useArenaHelper
