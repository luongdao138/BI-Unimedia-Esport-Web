import { T_TYPE, TOURNAMENT_STATUS, LOBBY_STATUS } from '@constants/lobby.constants'
import moment from 'moment'
import _ from 'lodash'
import { FormikErrors } from 'formik'
import { FormType } from '@containers/Lobby/UpsertForm/FormModel/FormType'
import { LobbyDetail } from '@services/lobby.service'

const getTypeValue = (t_type: string | number): boolean => {
  if (String(t_type) === T_TYPE.PRIVATE) return false
  else if (String(t_type) === T_TYPE.PUBLIC) return true

  return true
}

const onTypeChange = (type: string | number): string => {
  if (type == T_TYPE.PUBLIC) return T_TYPE.PRIVATE
  else return T_TYPE.PUBLIC
}

const checkStatus = (status: LOBBY_STATUS, targetStatus: string): boolean => {
  const statuses = Object.values(LOBBY_STATUS)
  const index = statuses.indexOf(status)
  const targetIndex = statuses.indexOf(targetStatus)

  return index < targetIndex
}

const defaultDetails = (user_id: number): any => {
  return {
    title: '',
    overview: '',
    game_title_id: [],
    game_hardware_id: -1,
    has_third_place: true,
    participant_type: -1,
    max_participants: 0,
    terms_of_participation: '',
    acceptance_start_date: null,
    acceptance_end_date: null,
    start_date: null,
    end_date: null,
    area_id: 1,
    area_name: '',
    address: '',
    has_prize: true,
    retain_history: true,
    t_type: -1,
    rule: -1,
    prize_amount: '',
    notes: '',
    owner_id: user_id,
    organizer_name: '',
    cover_image_url: null,
    co_organizers: [],
  }
}

const formatDate = (date: string): string => {
  return moment(date).format('YYYY/MM/DD HH:mm')
}

const checkTarget = (targetIds: Array<number>, target: number): boolean => {
  if (!targetIds || !target || _.isEmpty(targetIds)) return false

  return targetIds.includes(Number(target))
}

// const checkRoles = (roles, role): boolean => {
//   if (!roles || !role || _.isEmpty(roles)) return false

//   return roles.includes(role)
// }

const getDetailData = (tournament: LobbyDetail): any => {
  const _data = { ...tournament.attributes }
  const isTeam = false // _data.participant_type > 1
  const isAdmin = _data.is_owner
  const showStatus = isAdmin ? TOURNAMENT_STATUS.RECRUITING : TOURNAMENT_STATUS.READY_TO_START
  const noEntry = _data.participants_count == 0 && _data.entry_count == 0
  const scoreEnterable = _data.status === LOBBY_STATUS.IN_PROGRESS || _data.status === LOBBY_STATUS.ENDED
  const joinedCount = _data.entry_count + _data.participants_count
  const maxCapacity = _data.is_freezed
    ? _data.participants_count
    : checkStatus(_data.status, TOURNAMENT_STATUS.RECRUITMENT_CLOSED) || joinedCount > _data.max_participants
    ? _data.max_participants
    : joinedCount
  const memberSelectable =
    isAdmin && (_data.status === LOBBY_STATUS.ENTRY_CLOSED || (_data.status === LOBBY_STATUS.IN_PROGRESS && !_data.is_freezed))
  const teamIds = [] //_.map(_data.my_info, (team: any) => team.team_id)
  const teamRoles = undefined // isTeam ? _.map(_data.my_info, (team: any) => team.role) : undefined
  const ownEnterable = false // isTeam ? checkRoles(teamRoles, ROLE.PARTICIPANT) : _data.my_role === ROLE.PARTICIPANT

  return {
    ...tournament.attributes,
    id: tournament.id,
    showMatch: !checkStatus(_data.status, showStatus),
    isTeam,
    isAdmin,
    noEntry,
    scoreEnterable,
    maxCapacity,
    memberSelectable,
    teamIds,
    teamRoles,
    ownEnterable,
  }
}

const isStatusPassed = (status: string, targetStatus: string): boolean => {
  const statuses = [
    TOURNAMENT_STATUS.READY,
    TOURNAMENT_STATUS.RECRUITING,
    TOURNAMENT_STATUS.RECRUITMENT_CLOSED,
    TOURNAMENT_STATUS.READY_TO_START,
    TOURNAMENT_STATUS.IN_PROGRESS,
    TOURNAMENT_STATUS.COMPLETED,
    TOURNAMENT_STATUS.CANCELLED,
  ]
  const index = statuses.indexOf(status)
  const targetIndex = statuses.indexOf(targetStatus)

  return index >= targetIndex
}

const checkRequiredFields = (errors: FormikErrors<FormType>): boolean => {
  const { stepOne, stepTwo } = errors

  const requiredFieldErrors = []
  if (stepOne) {
    requiredFieldErrors.push(stepOne.title)
    requiredFieldErrors.push(stepOne.max_participants)
  }
  if (stepTwo) {
    requiredFieldErrors.push(stepTwo.entry_start_datetime)
    requiredFieldErrors.push(stepTwo.entry_end_datetime)
    requiredFieldErrors.push(stepTwo.start_datetime)
    requiredFieldErrors.push(stepTwo.area_id)
  }

  const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)

  return _.isEmpty(filteredErrors)
}

export const LobbyHelper = {
  formatDate,
  defaultDetails,
  getTypeValue,
  checkStatus,
  checkTarget,
  getDetailData,
  onTypeChange,
  isStatusPassed,
  checkRequiredFields,
}
