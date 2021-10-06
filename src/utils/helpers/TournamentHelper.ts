import { PARTICIPATION_TYPES, RULE, T_TYPE, TOURNAMENT_STATUS, ROLE } from '@constants/tournament.constants'
import moment from 'moment'
import _ from 'lodash'
import { ParticipantsResponse, TournamentDetail, TournamentMatchRound, TournamentRule } from '@services/arena.service'
import { FormikErrors } from 'formik'
import { FormType } from '@containers/arena/UpsertForm/FormModel/FormType'

interface TimeProps {
  hours: string | number
  minutes: string | number
  seconds: string | number
  millis: string | number
}

const participantTypeText = (participant_type: number): string => {
  const type = PARTICIPATION_TYPES.filter((t) => t.value === participant_type)[0]

  return type?.label
}

const ruleText = (rule: string): string => {
  let ruleText = ''
  switch (rule) {
    case RULE.SINGLE:
      ruleText = 'トーナメント'
      break
    case RULE.BATTLE_ROYALE:
      ruleText = 'バトルロイヤル'
      break
    default:
      ruleText = ''
  }
  return ruleText
}

const getTypeValue = (t_type: string | number): boolean => {
  if (String(t_type) === T_TYPE.PRIVATE) return false
  else if (String(t_type) === T_TYPE.PUBLIC) return true

  return true
}

const onTypeChange = (type: string | number): string => {
  if (type == T_TYPE.PUBLIC) return T_TYPE.PRIVATE
  else return T_TYPE.PUBLIC
}

const checkStatus = (status: string, targetStatus: string): boolean => {
  const statuses = ['ready', 'recruiting', 'recruitment_closed', 'ready_to_start', 'in_progress', 'completed', 'cancelled']
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

const checkRoles = (roles, role): boolean => {
  if (!roles || !role || _.isEmpty(roles)) return false

  return roles.includes(role)
}

const getDetailData = (tournament: TournamentDetail) => {
  const _data = { ...tournament.attributes }
  const isTeam = _data.participant_type > 1
  const isAdmin = _data.my_role === ROLE.ADMIN || _data.my_role === ROLE.CO_ORGANIZER
  const showStatus = isAdmin ? TOURNAMENT_STATUS.RECRUITING : TOURNAMENT_STATUS.READY_TO_START
  const noEntry = _data.participant_count == 0 && _data.interested_count == 0
  const scoreEnterable = _data.status === TOURNAMENT_STATUS.IN_PROGRESS || _data.status === TOURNAMENT_STATUS.COMPLETED
  const joinedCount = _data.interested_count + _data.participant_count
  const maxCapacity = _data.is_freezed
    ? _data.participant_count
    : checkStatus(_data.status, TOURNAMENT_STATUS.RECRUITMENT_CLOSED) || joinedCount > _data.max_participants
    ? _data.max_participants
    : joinedCount
  const memberSelectable =
    isAdmin &&
    (_data.status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || (_data.status === TOURNAMENT_STATUS.IN_PROGRESS && !_data.is_freezed))
  const isBattleRoyale = _data.rule === RULE.BATTLE_ROYALE
  const teamIds = _.map(_data.my_info, (team: any) => team.team_id)
  const teamRoles = isTeam ? _.map(_data.my_info, (team: any) => team.role) : undefined
  const ownEnterable = isTeam ? checkRoles(teamRoles, ROLE.PARTICIPANT) : _data.my_role === ROLE.PARTICIPANT

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
    isBattleRoyale,
    teamIds,
    teamRoles,
    ownEnterable,
  }
}

const checkParticipantsSelected = (bracketData: TournamentMatchRound[], interested_count: number, max_participants: number): boolean => {
  let selected = true
  const matches = bracketData[0]
  let p_ids: any = []

  _.forEach(matches, (match) => {
    p_ids.push(match.home_user)
    p_ids.push(match.guest_user)
    if (match.home_user === null && match.guest_user === null) {
      selected = false
      return false
    } else return true
  })

  p_ids = _.compact(p_ids)
  const max_capacity = matches.length * 2 > max_participants ? max_participants : matches.length * 2
  if (interested_count >= max_capacity) {
    if (p_ids.length != max_capacity) selected = false
  } else {
    if (p_ids.length != interested_count) selected = false
  }
  return selected
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
  const { stepOne, stepTwo, stepThree } = errors

  const requiredFieldErrors = []
  if (stepOne) {
    requiredFieldErrors.push(stepOne.title)
    requiredFieldErrors.push(stepOne.game_title_id)
    requiredFieldErrors.push(stepOne.game_hardware_id)
    if (stepOne.prize_amount) {
      requiredFieldErrors.push(stepOne.prize_amount)
    }
  }
  if (stepTwo) {
    requiredFieldErrors.push(stepTwo.rule)
    requiredFieldErrors.push(stepTwo.participant_type)
    requiredFieldErrors.push(stepTwo.max_participants)
  }
  if (stepThree) {
    requiredFieldErrors.push(stepThree.start_date)
    requiredFieldErrors.push(stepThree.end_date)
    requiredFieldErrors.push(stepThree.acceptance_start_date)
    requiredFieldErrors.push(stepThree.acceptance_end_date)
    requiredFieldErrors.push(stepThree.recruit_date)
    requiredFieldErrors.push(stepThree.acceptance_dates)
    requiredFieldErrors.push(stepThree.acceptance_end_start_date)
    requiredFieldErrors.push(stepThree.start_end_date)
    requiredFieldErrors.push(stepThree.area_id)
  }

  const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)

  return _.isEmpty(filteredErrors)
}

const arenaFormLabelNames = {
  title: 'common:tournament_create.name',
  overview: 'common:tournament_create.overview',
  has_prize: 'common:tournament_create.has_prize',
  prize_amount: 'common:tournament_create.has_prize',
  game_title_id: 'common:tournament_create.game',
  game_hardware_id: 'common:tournament_create.game_hardware',
  rule: 'common:tournament_create.holding_format',
  participant_type: 'common:tournament_create.participation',
  max_participants: 'common:tournament_create.max_participants',
  terms_of_participation: 'common:tournament_create.participation_term',
  notes: 'common:tournament_create.precautions',
  start_date: 'common:tournament_create.holding_period',
  end_date: 'common:tournament_create.holding_period',
  acceptance_start_date: 'common:tournament_create.entry_period',
  acceptance_end_date: 'common:tournament_create.entry_period',
  area_id: 'common:tournament_create.area',
  address: 'common:tournament_create.area_address',
  recruit_date: 'common:tournament_create.entry_period',
  acceptance_dates: 'common:tournament_create.entry_period',
  acceptance_end_start_date: 'common:tournament_create.entry_period',
  start_end_date: 'common:tournament_create.holding_period',
  organizer_name: 'common:tournament_create.organizer_name',
}

const getLabelName = (field: string): string => {
  const name = _.get(arenaFormLabelNames, field)
  if (_.isString(name)) {
    return name
  }
  return ''
}

const formatArenaScore = (score: number, rule: TournamentRule): string => {
  if (rule === 'time_attack') {
    const { hours, minutes, seconds, millis } = millisToTime(score)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(
      millis
    ).padStart(3, '0')}`
  } else if (rule === 'score_attack') return new Intl.NumberFormat().format(score)

  return String(score)
}

function isBattleRoyale(arena: TournamentDetail) {
  if (arena.attributes.rule === 'battle_royale') return true
  if (arena.attributes.rule === 'score_attack') return true
  if (arena.attributes.rule === 'time_attack') return true
  return false
}

function isBRResultComplete(participants: ParticipantsResponse[]) {
  for (const p of participants) {
    if (p.attributes.position === null) return false
  }
  return true
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const millisToTime = (duration: number | null) => {
  if (duration === null) {
    return { hours: '', minutes: '', seconds: '', millis: '' }
  }

  const millis: string | number = Math.floor(duration % 1000)
  const seconds: string | number = Math.floor((duration / 1000) % 60)
  const minutes: string | number = Math.floor((duration / (1000 * 60)) % 60)
  const hours: string | number = Math.floor(duration / (1000 * 60 * 60))

  return { hours: Number(hours), minutes: minutes, seconds: seconds, millis: millis }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const timeToMillis = (time: TimeProps) => {
  const { hours, minutes, seconds, millis } = time
  const result = Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000 + Number(seconds) * 1000 + Number(millis) * 1
  return result
}

export const TournamentHelper = {
  millisToTime,
  timeToMillis,
  participantTypeText,
  ruleText,
  formatDate,
  defaultDetails,
  getTypeValue,
  checkStatus,
  checkTarget,
  getDetailData,
  checkParticipantsSelected,
  onTypeChange,
  isStatusPassed,
  checkRequiredFields,
  getLabelName,
  formatArenaScore,
  isBattleRoyale,
  isBRResultComplete,
}
