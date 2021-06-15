import { SuggestionDataItem } from 'react-mentions'
import { CHAT_MESSAGE_TYPE, CHAT_MEMBER_TYPE, CHAT_MEMBER_STATUS } from '@constants/socket.constants'

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
  unfollowed?: any[]
}

export interface ChatSuggestionList extends SuggestionDataItem {
  userId: number
  nickName: string
  memberType?: number
  unseenCount?: number
  chatRoomId?: string
  sortKey?: sting
  memberStatus?: number
  createdAt?: number
  groupType?: number
  userCode?: string
  profile?: string
}

export type MessageType = {
  title?: string
  msg?: string
  chatRoomId?: string
  sortKey?: string
  userId?: number
  createdAt?: number
  clientId?: string
  type: CHAT_MESSAGE_TYPE
  parentMsg?: null | ParentItem | string
  sent?: boolean
  formattedMsg?: string
}

export type ParentItem = {
  msg: string
  chatRoomId: string
  sortKey: string
  userId: number
  createdAt: number
  groupType: number
  clientId: string
  type: CHAT_MESSAGE_TYPE
  isDeleted: boolean
  parentMsgDeletedText?: string
}

export interface ChatRoomMemberItem {
  chatRoomId?: string
  createdAt: number
  display: string
  groupType: number
  id: string
  memberStatus: CHAT_MEMBER_STATUS
  memberType: CHAT_MEMBER_TYPE
  nickName: string
  profile: string
  sortKey: string
  unseenCount: number
  userCode: string
  userId: number
}
