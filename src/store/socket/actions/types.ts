import { ChatDataType, ChatRoomMemberItem, MessageType } from '@components/Chat/types/chat.types'

export interface State {
  roomList: ChatDataType[] | undefined
  messages: MessageType[] | undefined
  lastKey: string | null
  paginating: boolean
  members: ChatRoomMemberItem[] | undefined
  activeRoom: string | undefined
  chatMembers: ChatRoomMemberItem[]
  socketReady: boolean
  actionPending: boolean
  newRoomId?: string
  selectedRoomInfo?: ChatDataType
}
