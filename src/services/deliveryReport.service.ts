import api from './api'
import { URI } from '@constants/uri.constants'

export type TipReportParams = {
  uuid: string | string[]
}

export type TicketReportParams = {
  uuid: string | string[]
}

export type DetailedReportParams = {
  uuid: string | string[]
  page?: number
  limit?: number
}
export type PageMeta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export type GiftsResponse = {
  name: string
  image: string | null
  sns_url?: string | null
  status?: number
  point: number
  point_user_giver?: number
  user_give_count?: number
}

export type TipReportResponse = {
  data: {
    total: number
    gifts: GiftsResponse[]
  }
}

export type TicketsResponse = {
  nickname: string
  point: number
  image_url: string
  type: number
  created_at: string
}

export type TicketReportResponse = {
  data: {
    total: number
    tickets: TicketsResponse[]
  }
}

export type DetailedResponse = {
  created_at: string
  nickname: string
  point: number
  type_report: string
  gift_recipient: string
}

export type DetailedReportResponse = {
  data: {
    total: number
    points: DetailedResponse[]
  }
}

export const tipReportList = async (params: TipReportParams): Promise<TipReportResponse> => {
  const { data } = await api.get<TipReportResponse>(URI.TIP_REPORT, { params })
  return data
}

export const ticketReportList = async (params: TicketReportParams): Promise<TicketReportResponse> => {
  const { data } = await api.get<TicketReportResponse>(URI.TICKET_REPORT, { params })
  return data
}

export const detailedReportList = async (params: DetailedReportParams): Promise<DetailedReportResponse> => {
  const { data } = await api.get<DetailedReportResponse>(URI.DETAILED_REPORT, { params })
  return data
}
