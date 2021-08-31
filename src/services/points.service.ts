import api from './api'
import { URI } from '@constants/uri.constants'
// import { UserProfile } from './user.service'

export type ListPointsParams = {
  page?: number
  limit?: number
}
export type DetailUsagePointParams = {
  uuid: number
}
export type HistoryPointsParams = {
  page?: number
  limit?: number
  type: number // purchase_history: 1 - usage_history: 2
  period?: string
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
  const { data } = await api.get<any>(URI.GET_HISTORY_POINTS, { params })
  return data
}

export const ListUsedPoints = async (params: ListPointsParams): Promise<PointUsedResponse> => {
  const { data } = await api.get<any>(URI.GET_LIST_USED_POINTS, { params })
  return data
}

export const ListUsagePointsHistoryDetail = async (params: DetailUsagePointParams): Promise<PointUsedDetailResponse> => {
  const { data } = await api.get<any>(URI.GET_USAGE_POINTS_DETAIL, { params })
  return data
}
