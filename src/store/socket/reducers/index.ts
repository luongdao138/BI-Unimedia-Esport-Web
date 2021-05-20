import { State } from '../actions/types'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { AnyAction } from 'redux'
import { MessageType, ChatRoomMemberItem } from '@components/Chat/types/chat.types'
import _ from 'lodash'

const initialState: State = {
  roomList: undefined,
  messages: undefined,
  members: undefined,
  lastKey: null,
  paginating: false,
  activeRoom: null,
}

let newMessagesList: MessageType[] | undefined
let newUsers: ChatRoomMemberItem[] | undefined

const socketReducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case CHAT_ACTION_TYPE.GET_ALL_ROOMS:
      return {
        ...state,
        roomList: action.data.content,
      }
    case CHAT_ACTION_TYPE.GET_ROOM_MESSAGES:
      if (action.data.content === [] || action.data.content.length === 0) {
        // case when socket error or wrong data return from server
        newMessagesList = []
        newUsers = action.data.members
      } else if (state.lastKey != null && state.activeRoom === action.data.chatRoomId) {
        //paginating data merging
        const prevArray = state.messages
        const temp = _.concat(prevArray, action.data.content)
        newMessagesList = temp
        newUsers = state.members
      } else {
        newUsers = action.data.members
        newMessagesList = action.data.content
      }
      return {
        ...state,
        activeRoom: action.data.chatRoomId,
        messages: newMessagesList,
        members: newUsers,
        lastKey: action.data.lastKey,
        paginating: false,
      }
    default:
      return state
  }
}

export default socketReducer
