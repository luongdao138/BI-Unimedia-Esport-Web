import { LOBBY_STATUS } from '@constants/lobby.constants'
import moment from 'moment'
import _ from 'lodash'

const checkStatus = (status: LOBBY_STATUS, targetStatus: LOBBY_STATUS): boolean => {
  const statuses = Object.values(LOBBY_STATUS)
  const index = statuses.indexOf(status)
  const targetIndex = statuses.indexOf(targetStatus)

  return index < targetIndex
}

const formatDate = (date: string): string => {
  return moment(date).format('YYYY/MM/DD HH:mm')
}

const lobbyFormLabelNames = {
  title: 'common:lobby.create.name',
  max_participants: 'common:lobby.create.max_participants',
  entry_start_datetime: 'common:lobby.create.entry_period',
  entry_end_datetime: 'common:lobby.create.entry_period',
  recruit_date: 'common:lobby.create.entry_period',
  before_entry_end_date: 'common:lobby.create.entry_period',
  acceptance_dates: 'common:lobby.create.entry_period',
  area_id: 'common:lobby.create.area',
  start_datetime: 'common:lobby.create.holding_period',
  acceptance_end_start_date: 'common:lobby.create.holding_period',
  address: 'common:lobby.create.address',
  message: 'common:lobby.create.overview',
}

const getLabelName = (field: string): string => {
  const name = _.get(lobbyFormLabelNames, field)
  if (_.isString(name)) {
    return name
  }
  return ''
}

export const LobbyHelper = {
  formatDate,
  checkStatus,
  getLabelName,
}
