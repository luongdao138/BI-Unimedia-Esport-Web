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

const getTimezone = (): string => {
  const z = (n) => (n < 10 ? '0' : '') + n
  let offset = new Date().getTimezoneOffset()
  const sign = offset < 0 ? '+' : '-'
  offset = Math.abs(offset)
  return sign + z((offset / 60) | 0) + ':' + z(offset % 60)
}

export const DateHelper = {
  formatDateTime,
  formatDate,
  formatLobbyCardDate,
  getTimezone,
}
