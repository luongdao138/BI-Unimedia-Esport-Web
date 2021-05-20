import { SuggestionDataItem } from 'react-mentions'

export type ChatDataType = {
  unseenCount: number
  chatRoomId: string
  lastMsgAt: number
  roomName: string
  lastMsg: string
  roomImg: string
  sortKey: string
  createdAt: number
  groupType: number
  isAdmin: boolean
  blocked?: any[]
}

export interface ChatSuggestionList extends SuggestionDataItem {
  userId: number
  nickName: string
  profile: string
  memberType?: number
  unseenCount?: number
  chatRoomId?: string
  sortKey?: sting
  memberStatus?: number
  createdAt?: number
  groupType?: number
  userCode?: string
  nickName?: string
  profile?: string
}

export interface ChatRoomMemberItem {
  chatRoomId: string
  createdAt: number
  display: string
  groupType: number
  id: string
  memberStatus: number
  memberType: number
  nickName: string
  profile: string
  sortKey: string
  unseenCount: number
  userCode: string
  userId: number
}
