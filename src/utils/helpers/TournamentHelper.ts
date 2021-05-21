import { PARTICIPATION_TYPES, RULE } from '@constants/tournament.constants'
import moment from 'moment'
import _ from 'lodash'

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
  return moment.utc(date).format('YYYY年MM月DD日')
}

const getRemainingDate = (date: string): number => {
  const endDate = moment(moment(date).format('YYYY-MM-DD'))
  const nowDate = moment()
  return endDate.diff(nowDate, 'days')
}

const checkTarget = (targetIds: Array<number>, target: number): boolean => {
  if (!targetIds || !target || _.isEmpty(targetIds)) return false

  return targetIds.includes(Number(target))
}

export const TournamentHelper = {
  participantTypeText,
  ruleText,
  formatDate,
  getRemainingDate,
  checkTarget,
}
