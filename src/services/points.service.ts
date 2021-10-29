import api from './api'
import { URI } from '@constants/uri.constants'

export type PurchaseTicketParams = {
  user_id?: number
  point: number
  type: number //1 : mua ticket, 2 : supper chat
  video_id: string | string[]
  timezone?: string
  handleError?: () => void
  handleSuccess?: () => void
}
export type PurchaseTicketResponse = {
  message?: string
  code?: number
  data?: Array<any>
}

export type ListPointsParams = {
  page?: number
  limit?: number
  timezone?: string
}
export type DetailUsagePointParams = {
  page?: number
  limit?: number
  uuid?: number
  timezone?: string
}
export type HistoryPointsParams = {
  page?: number
  limit?: number
  type: number // purchase_history: 1 - usage_history: 2
  period?: string
  timezone?: string
}
export type ListMyPointsResponse = {
  message?: string
  code?: number
  data?: {
    total: number
    total_point: number
    aggregate_points: Array<ListMyPointsData>
  }
}
export type PointHistoryResponse = {
  message?: string
  code?: number
  data?: {
    date_by_points: Array<string>
    total: number
    points: Array<ListHistoryPointsData>
  }
}
export type PointUsedResponse = {
  message?: string
  code?: number
  data?: {
    date_use_points: Array<string>
    total: number
    points: Array<ListUsedPointsData>
  }
}

export type PointUsedDetailResponse = {
  message?: string
  code?: number
  data?: {
    purchase_point: {
      uuid: string
      point: number
      valid_until: string
      created_at: string
      total: number
      point_history: Array<ListUsagePointHistoryData>
    }
  }
}
export type ListUsagePointHistoryData = {
  purchase_id: string
  point: number
  created_at: string
  canceled_at: string
  type: number
  status: string
}

export type ListMyPointsData = {
  uuid?: string
  point: number
  valid_until: string
}

export type ListHistoryPointsData = {
  uuid: string
  point: number
  created_at: string
  expired_date: string
  divide: string
}
export type ListUsedPointsData = {
  uuid?: string
  type: number
  point: number
  purchased_point_id?: string
  created_at: string
  status: string
}

export const ListMyPoints = async (params: ListPointsParams): Promise<ListMyPointsResponse> => {
  const { data } = await api.get<ListMyPointsResponse>(URI.GET_LIST_MY_POINTS, { params })
  return data
}

export const ListHistoryPoints = async (params: ListPointsParams): Promise<PointHistoryResponse> => {
  const { data } = await api.get<PointHistoryResponse>(URI.GET_HISTORY_POINTS, { params })
  return data
}

export const ListUsedPoints = async (params: ListPointsParams): Promise<PointUsedResponse> => {
  const { data } = await api.get<PointUsedResponse>(URI.GET_LIST_USED_POINTS, { params })
  return data
}

export const ListUsagePointsHistoryDetail = async (params: DetailUsagePointParams): Promise<PointUsedDetailResponse> => {
  const { data } = await api.get<PointUsedDetailResponse>(URI.GET_USAGE_POINTS_DETAIL, { params })
  return data
}

export const PurchaseTicketSuperChat = async (params: PurchaseTicketParams): Promise<PurchaseTicketResponse> => {
  const { data } = await api.post<PurchaseTicketResponse>(URI.PURCHASE_TICKET_SUPER_CHAT, params)
  return data
}
