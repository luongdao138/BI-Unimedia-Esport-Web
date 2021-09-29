import { useRouter } from 'next/router'
import { TournamentDetail } from '@services/arena.service'
import { ROLE, RULE, TOURNAMENT_STATUS } from '@constants/tournament.constants'
import { ESRoutes } from '@constants/route.constants'
import { useContextualRouting } from 'next-use-contextual-routing'
import _ from 'lodash'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'

const useArenaHelper = (tournament?: TournamentDetail) => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const hashKey = tournament?.attributes?.hash_key
  const chatRoomId = tournament?.attributes?.chat_room_id
  const myRole = tournament?.attributes?.my_role
  const status = tournament?.attributes?.status
  const isModerator = myRole === ROLE.ADMIN || myRole === ROLE.CO_ORGANIZER
  const isInProgress = status === TOURNAMENT_STATUS.IN_PROGRESS
  const isCancelled = status === TOURNAMENT_STATUS.CANCELLED
  const isCompleted = status === TOURNAMENT_STATUS.COMPLETED
  const isRecruitmentClosed = status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || status === TOURNAMENT_STATUS.READY_TO_START
  const isBattleRoyale = [RULE.BATTLE_ROYALE, RULE.TIME_ATTACK, RULE.SCORE_ATTACK].includes(tournament?.attributes?.rule)
  const isRecruiting = status === TOURNAMENT_STATUS.RECRUITING
  const isTeam = tournament?.attributes?.participant_type > 1
  const isEditable = isModerator && status !== TOURNAMENT_STATUS.CANCELLED
  const isFreezed = tournament?.attributes?.is_freezed
  const isNotHeld = isCompleted && !isFreezed
  const isReady = status === TOURNAMENT_STATUS.READY
  const isEntered = tournament?.attributes?.is_entered
  const isUnselected = isEntered && isFreezed && myRole === ROLE.INTERESTED
  const joinedCount = tournament ? tournament.attributes.interested_count + tournament.attributes.participant_count : 0
  const maxCapacity = tournament?.attributes.is_freezed
    ? tournament?.attributes.participant_count
    : TournamentHelper.checkStatus(tournament?.attributes.status, TOURNAMENT_STATUS.RECRUITMENT_CLOSED) ||
      joinedCount > tournament.attributes.max_participants
    ? tournament?.attributes.max_participants
    : joinedCount
  const isMemberSelectable =
    isModerator &&
    (tournament.attributes.status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED ||
      (tournament.attributes.status === TOURNAMENT_STATUS.IN_PROGRESS && !tournament.attributes.is_freezed))
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
  const isParticipant = checkIsParticipant(tournament)
  const isInterested = checkIsInterested(tournament)

  const toCreate = () => router.push(makeContextualHref({ pathName: '/arena/create' }), '/arena/create', { shallow: true })
  const toEdit = () =>
    router.push(makeContextualHref({ hash_key: hashKey }), `/arena/${hashKey}/edit`, {
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

  const toParticipants = () => router.push(makeContextualHref({ modalName: 'participants' }), `${hashKey}/participants`, { shallow: true })

  return {
    toGroupChat,
    toMatches,
    toResults,
    isFreezed,
    isInProgress,
    isCancelled,
    isCompleted,
    isRecruitmentClosed,
    isBattleRoyale,
    isModerator,
    isParticipant,
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
    toParticipants,
    maxCapacity,
    isMemberSelectable,
    isInterested,
  }
}

const checkIsParticipant = (arena: TournamentDetail) => _.some(arena?.attributes.my_info || [], { role: 'participant' })
const checkIsInterested = (arena: TournamentDetail) => _.some(arena?.attributes.my_info || [], { role: 'interested' })

export default useArenaHelper
