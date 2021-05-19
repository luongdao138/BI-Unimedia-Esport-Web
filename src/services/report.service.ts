import api from './api'
import { URI } from '@constants/uri.constants'

export type ReportParams = {
  description: string
  reason_id: number
  report_type: number
  user_email: string
}

export type ReportResponse = {
  success: string
}

export type ReasonsParams = {
  page: number
}

export type ReasonsResponse = {
  data: Array<ReasonResponse>
  meta: any
}

export type ReasonResponse = {
  id: number
  attributes: any
}

export type Meta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export const createReport = async (params: ReportParams): Promise<ReportResponse> => {
  const { data } = await api.put<ReportResponse>(URI.REPORT, params)
  return data
}

export const getReportReasons = async (params: ReasonsParams): Promise<ReasonsResponse> => {
  const { data } = await api.get<ReasonsResponse>(URI.REPORT_REASONS, { params })
  return data
}
