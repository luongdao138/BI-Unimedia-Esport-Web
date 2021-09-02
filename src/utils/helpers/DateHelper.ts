import moment from 'moment'

const formatDateTime = (date: string): string => {
  return date ? moment(date).format('YYYY/MM/DD HH:mm') : ''
}

const formatDate = (date: string): string => {
  return date ? moment(date).format('YYYY/MM/DD') : ''
}

export const DateHelper = {
  formatDateTime,
  formatDate,
}
