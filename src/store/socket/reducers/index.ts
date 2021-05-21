import { State } from '../actions/types'
import { CHAT_ACTION_TYPE, WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { AnyAction } from 'redux'
import { MessageType, ChatRoomMemberItem } from '@components/Chat/types/chat.types'
import _ from 'lodash'
import { ChatHelper } from './utils'

const initialState: State = {
  roomList: undefined,
  messages: undefined,
  members: undefined,
  lastKey: null,
  paginating: false,
  activeRoom: null,
  chatMembers: [],
  socketReady: false,
}

let newMessagesList: MessageType[] | undefined
let newUsers: ChatRoomMemberItem[] | undefined
let result: MessageType[] | undefined
let pending: MessageType[] | undefined
let oldMessages: MessageType[] | undefined
let newMsg: MessageType[] | undefined
let mergedMsg: MessageType[] | undefined

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
    case CHAT_ACTION_TYPE.MESSAGE_PENDING:
      if (_.isArray(state.messages) && _.isEmpty(state.messages)) {
        pending = [action.data]
      } else {
        pending = _.concat(action.data, ...state.messages)
      }
      return {
        ...state,
        messages: pending,
      }

    case CHAT_ACTION_TYPE.CLEAN_ROOM:
      return {
        ...state,
        messages: undefined,
      }
    case CHAT_ACTION_TYPE.SEND_MESSAGE:
      oldMessages = state.messages
      newMsg = action.data.content
      mergedMsg = ChatHelper.messagesMerge([...oldMessages], newMsg)
      result = mergedMsg
      return {
        ...state,
        messages: result,
      }

    case CHAT_ACTION_TYPE.GET_ROOM_MEMBERS:
      return {
        ...state,
        chatMembers: action.data.content,
      }
    case CHAT_ACTION_TYPE.REMOVE_MEMBER:
      return {
        ...state,
        chatMembers: action.data.content,
      }
    case `${WEBSOCKET_PREFIX}:CONNECTED`:
      return {
        ...state,
        socketReady: true,
      }
    case `${WEBSOCKET_PREFIX}:DISCONNECTED`:
      return {
        ...state,
        socketReady: false,
      }
    default:
      return state
  }
}

export default socketReducer
