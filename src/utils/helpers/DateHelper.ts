import moment from 'moment'

const formatDateTime = (date: string): string => {
  return date ? moment(date).format('YYYY/MM/DD HH:mm') : ''
}

const formatDate = (date: string): string => {
  return date ? moment(date).format('YYYY/MM/DD') : ''
}

const formatLobbyCardDate = (date: string): string => {
  return date ? moment(date).format('MM/DD HH:mm') : ''
}

export const DateHelper = {
  formatDateTime,
  formatDate,
  formatLobbyCardDate,
}
