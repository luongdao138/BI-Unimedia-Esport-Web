import { useRouter } from 'next/router'
import { LobbyDetail } from '@services/lobby.service'
import { LOBBY_STATUS, ROLE, LOBBY_PARTICIPANT_STATUS } from '@constants/lobby.constants'
import { ESRoutes } from '@constants/route.constants'
import { useContextualRouting } from 'next-use-contextual-routing'
import _ from 'lodash'

const useLobbyHelper = (
  tournament?: LobbyDetail
): {
  toMatches: () => void
  toResults: () => void
  toGroupChat: () => void
  isModerator: boolean
  isInProgress: boolean
  isCancelled: boolean
  isCompleted: boolean
  isRecruitmentClosed: boolean
  isBattleRoyale: boolean
  isRecruiting: boolean
  isTeam: boolean
  isEditable: boolean
  isNotHeld: boolean
  isReady: boolean
  isEntered: boolean
  isUnselected: boolean
  toEdit: () => void
  toCreate: () => void
  isAdminJoined: boolean
  isTeamLeader: boolean
  toDetail: () => void
  isSelected: boolean
} => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hashKey = tournament?.attributes?.hash_key
  const chatRoomId = tournament?.attributes?.chatroom_id
  // const myRole = tournament?.attributes?.is_owner
  const status = tournament?.attributes?.status
  const isModerator = tournament?.attributes?.is_owner // myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isInProgress = status === LOBBY_STATUS.IN_PROGRESS
  const isCancelled = status === LOBBY_STATUS.CANCELLED
  const isCompleted = status === LOBBY_STATUS.ENDED
  const isRecruitmentClosed = status === LOBBY_STATUS.ENTRY_CLOSED // || status === LOBBY_STATUS.READY_TO_START
  const isBattleRoyale = false // tournament?.attributes?.rule === RULE.BATTLE_ROYALE
  const isRecruiting = status === LOBBY_STATUS.RECRUITING
  const isTeam = false //tournament?.attributes?.participant_type > 1
  const isEditable = isModerator && status !== LOBBY_STATUS.CANCELLED
  const isFreezed = tournament?.attributes?.is_freezed
  const isNotHeld = isCompleted && !isFreezed
  const isReady = status === LOBBY_STATUS.READY
  const isEntered = tournament?.attributes?.participant_status === LOBBY_PARTICIPANT_STATUS.ENTERED
  const isUnselected = isEntered && isFreezed // && myRole === ROLE.INTERESTED
  const isSelected = isEntered // && myRole === ROLE.PARTICIPANT

  const checkAdminJoined = () => {
    if (!isModerator) return false
    const myInfoList = _.get(tournament, 'attributes.my_info', [])
    if (!_.isArray(myInfoList)) return false

    return _.some(myInfoList, { role: ROLE.INTERESTED })
  }
  const isAdminJoined = checkAdminJoined()

  const checkTeamLeader = () => {
    const myInfoList = _.get(tournament, 'attributes.my_info', [])
    if (!_.isArray(myInfoList)) return false

    return _.some(myInfoList, { is_leader: true })
  }
  const isTeamLeader = checkTeamLeader()

  const toCreate = () => router.push(makeContextualHref({ pathName: '/lobby/create' }), '/lobby/create', { shallow: true })
  const toEdit = () =>
    router.push(makeContextualHref({ hash_key: hashKey }), `/lobby/${hashKey}/edit`, {
      shallow: true,
    })

  const toMatches = () => {
    if (isModerator && !isFreezed) {
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

  const toDetail = () => {
    router.push(ESRoutes.ARENA_DETAIL.replace(/:id/gi, hashKey))
  }

  return {
    toGroupChat,
    toMatches,
    toResults,
    isInProgress,
    isCancelled,
    isCompleted,
    isRecruitmentClosed,
    isBattleRoyale,
    isModerator,
    isRecruiting,
    isTeam,
    isEditable,
    isNotHeld,
    isReady,
    isUnselected,
    toEdit,
    toCreate,
    isAdminJoined,
    isTeamLeader,
    toDetail,
    isEntered,
    isSelected,
  }
}

export default useLobbyHelper
