import { ChatDataType, ChatRoomMemberItem, MessageType } from '@components/Chat/types/chat.types'

export interface State {
  roomList?: ChatDataType[]
  messages?: MessageType[]
  lastKey: string | null
  paginating: boolean
  members?: ChatRoomMemberItem[]
  activeRoom?: string
  socketReady: boolean
  actionPending: boolean
  newRoomId?: string
  selectedRoomInfo?: ChatDataType
  error?: string
}
