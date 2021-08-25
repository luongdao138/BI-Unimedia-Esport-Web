import api from './api'
import { URI } from '@constants/uri.constants'
// import { UserProfile } from './user.service'

export type ListPointsParams = {
  // type?: string
  page?: number
  limit?: number
}
export type ListMyPointsResponse = {
  message?: string
  code?: number
  data?: {
    total_point: string
    aggregate_points: Array<ListMyPointsData>
  }
}
export type PointHistoryResponse = {
  message?: string
  code?: number
  data?: Array<ListHistoryPointsData>
}
export type PointUsedResponse = {
  message?: string
  code?: number
  data?: Array<ListUsedPointsData>
}

export type ListMyPointsData = {
  purchased_id: string
  amount: string
  valid_until: string
}

export type ListHistoryPointsData = {
  purchased_id: string
  uuid: string
  amount: string
  divide: string
  created_at: string
  expired_date: string
}
export type ListUsedPointsData = {
  id: string
  uuid: string
  user_id: string
  transation_type: string
  transation_date: string
  amount: string
  valid_until: string
  cancel_flag: string
  cancel_date: string
  created_at: string
  update_at: string
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
