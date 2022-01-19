import { FORMAT_DATE_TIME_JP, FORMAT_FULL_DATE_TIME, FORMAT_YEAR_MONTH } from '@constants/common.constants'
import moment from 'moment'

const formatDateTime = (date: string): string => {
  return date ? moment(date).format('YYYY/MM/DD HH:mm') : ''
}

const formatDateTimeJP = (date: string): string => {
  return date ? moment(date).format(FORMAT_DATE_TIME_JP) : ''
}

const formatFullDateTime = (date: string): string => {
  return date ? moment(date).format(FORMAT_FULL_DATE_TIME) : ''
}

const formatDate = (date: string): string => {
  return date ? moment(date).format('YYYY/MM/DD') : ''
}

const formatMonth = (date: string | string[]): string => {
  return date ? moment(date).format('YYYY/MM') : ''
}

const formatMonthFilter = (date: string | string[]): string => {
  return date ? moment(date).format(FORMAT_YEAR_MONTH) : ''
}

const formatMonthFinancial = (date: string): string => {
  return date ? moment(date).format('YYYYMM') : ''
}

const formatLobbyCardDate = (date: string): string => {
  return date ? moment(date).format('MM/DD HH:mm') : ''
}

export const DateHelper = {
  formatFullDateTime,
  formatDateTime,
  formatDateTimeJP,
  formatDate,
  formatMonth,
  formatMonthFilter,
  formatLobbyCardDate,
  formatMonthFinancial,
}
