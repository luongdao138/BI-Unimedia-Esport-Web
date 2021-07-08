import api from './api'
import { URI } from '@constants/uri.constants'

export type BlockParams = {
  user_code: string
}

export type BlockResponse = {
  success: string
}

export type UnblockParams = {
  user_code: string
}

export type UnblockResponse = {
  success: string
}

export const blockUser = async (params: BlockParams): Promise<BlockResponse> => {
  const { data } = await api.post<BlockResponse>(URI.BLOCK, params)
  return data
}

export const unblockUser = async (params: UnblockParams): Promise<UnblockResponse> => {
  const { data } = await api.post<UnblockResponse>(URI.UNBLOCK, params)
  return data
}
