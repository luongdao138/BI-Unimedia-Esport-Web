import { PARTICIPATION_TYPES, RULE, T_TYPE } from '@constants/tournament.constants'
import moment from 'moment'

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

const getTypeValue = (t_type: string): number => {
  if (String(t_type) === T_TYPE.PRIVATE) return 1

  return 0
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
    participant_type: 0,
    max_participants: 0,
    terms_of_participation: '',
    acceptance_start_date: undefined,
    acceptance_end_date: undefined,
    start_date: undefined,
    end_date: undefined,
    area_id: 1,
    area_name: '',
    address: '',
    has_prize: true,
    retain_history: true,
    t_type: 't_public',
    rule: '',
    prize_amount: '',
    notes: '',
    owner_id: user_id,
    organizer_name: '',
    cover_image_url: null,
    co_organizers: [],
  }
}

const formatDate = (date: string): string => {
  return moment.utc(date).format('YYYY年MM月DD日')
}

const getRemainingDate = (date: string): number => {
  const endDate = moment(moment(date).format('YYYY-MM-DD'))
  const nowDate = moment()
  return endDate.diff(nowDate, 'days')
}

export const TournamentHelper = {
  participantTypeText,
  ruleText,
  formatDate,
  defaultDetails,
  getTypeValue,
  checkStatus,
  getRemainingDate,
}
