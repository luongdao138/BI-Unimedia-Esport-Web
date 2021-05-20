import { PARTICIPATION_TYPES, RULE } from '@constants/tournament.constants'
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

const defaultDetails = (user_id: number): any => {
  return {
    title: '',
    overview: '',
    game_title_id: [],
    game_hardware_id: -1,
    has_third_place: false,
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
    prize_amount: '',
    notes: '',
    owner_id: user_id,
    organizer_name: '',
    cover_image_url: null,
    co_organizers: [],
  }
}

const formatDate = (date: string): string => {
  return moment(date).format('YYYY年MM月DD日')
}

export const TournamentHelper = {
  participantTypeText,
  ruleText,
  formatDate,
  defaultDetails,
}
