import { ChatDataType, ChatRoomMemberItem } from '@components/Chat/types/chat.types'

export interface State {
  roomList: ChatDataType[] | undefined
  chatMembers: ChatRoomMemberItem[]
  socketReady: boolean
}
