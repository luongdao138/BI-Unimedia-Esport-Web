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
  userId: number | string
  nickName: string
  profile: string
}
