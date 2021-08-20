import moment from 'moment'

const formatDateTime = (date: string): string => {
  return date ? moment(date).format('YYYY/MM/DD HH:mm') : ''
}

export const DateHelper = {
  formatDateTime,
}
