import { URI } from '@constants/uri.constants'
import api from './api'

export type FinancialStatementItem = {
  date_report?: string
  point?: string | number
}
export type FinancialStatementData = {
  total?: number
  points?: Array<FinancialStatementItem>
}
export type FinancialStatementParams = {
  user_id?: string | number
  page?: number
  limit?: number
  timezone?: string
}
export type FinancialStatementResponse = {
  message?: string
  code?: number
  data?: FinancialStatementData
}

export type FinancialStatementDetailParams = {
  user_id?: string | number
  page?: number
  limit?: number
  period?: string
  timezone?: string
}
export type FinancialStatementDetailItem = {
  point?: string | number
  video_id?: string
  created_at?: string
  title?: string
}
export type FinancialStatementDetailData = {
  total?: number
  tax?: number
  points?: Array<FinancialStatementDetailItem>
}
export type FinancialStatementDetailResponse = {
  message?: string
  code?: number
  data?: FinancialStatementDetailData
}

export const fetchFinancialStatement = async (params: FinancialStatementParams): Promise<FinancialStatementResponse> => {
  const { data } = await api.get<FinancialStatementResponse>(URI.FINANCIAL_STATEMENT_YEAR, { params })
  return data
}

export const fetchFinancialStatementDetail = async (params: FinancialStatementDetailParams): Promise<FinancialStatementDetailResponse> => {
  const { data } = await api.get<FinancialStatementDetailResponse>(URI.FINANCIAL_STATEMENT_DETAIL, { params })
  return data
}
