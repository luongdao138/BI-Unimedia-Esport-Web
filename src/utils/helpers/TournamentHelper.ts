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

const formatDate = (date: string): string => {
  return moment(date).format('YYYY年MM月DD日')
}

export const TournamentHelper = {
  participantTypeText,
  ruleText,
  formatDate,
}
