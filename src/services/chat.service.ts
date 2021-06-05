import api from './api'
import { URI } from '@constants/uri.constants'

export type GetFriendsParam = {
  type: 'dm' | 'group'
  keyword?: string
}

export interface FriendItem {
  id: string
  type: string
  attributes: {
    allow_groups_from_strangers: boolean
    allow_messages_from_strangers: boolean
    avatar: string
    blocked_by_me: boolean
    blocked_by_user: boolean
    is_followed: boolean
    is_following: boolean
    nickname: string
    nickname2: string
    user_code: string
  }
}

export type GetFriendsResponse = {
  data: FriendItem[]
  links: {
    links: {
      last: string
      next: string
      self: string
    }
  }
}

export const getFriends = async (params: GetFriendsParam): Promise<GetFriendsResponse> => {
  const { data } = await api.post<GetFriendsResponse>(URI.FRIEND_LIST, params)
  return data
}
