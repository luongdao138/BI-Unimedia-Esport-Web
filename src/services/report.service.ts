import api from './api'
import { URI } from '@constants/uri.constants'

export type ReportParams = {
  description: string
}

export type ReportResponse = {
  success: string
}

export const createReport = async (params: ReportParams): Promise<ReportResponse> => {
  const { data } = await api.post<ReportResponse>(URI.REPORT, params)
  return data
}
