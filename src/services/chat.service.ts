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

export type GetDirectRoomResponse = {
  content: {
    sortKey: string
    chatRoomId: string
    lastMsgAt: string
    roomImg: null | string
    lastMsg: string
    createdAt: string
    roomName: string
    groupType: string
    lastMsgId: string
  } | null
}

export const getFriends = async (params: GetFriendsParam): Promise<GetFriendsResponse> => {
  const { data } = await api.post<GetFriendsResponse>(URI.FRIEND_LIST, params)
  return data
}

export const getDirectRoom = async (otherMemberId: number): Promise<GetDirectRoomResponse> => {
  const { data } = await api.get<GetDirectRoomResponse>(`${URI.DIRECT_ROOM}?other_member_id=${otherMemberId}`)
  return data
}
