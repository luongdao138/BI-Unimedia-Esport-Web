import { State } from '../actions/types'
import { CHAT_ACTION_TYPE, WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { AnyAction } from 'redux'
import { MessageType, ChatRoomMemberItem, ChatDataType } from '@components/Chat/types/chat.types'
import _ from 'lodash'
import { ChatHelper } from './utils'

const initialState: State = {
  roomList: undefined,
  messages: undefined,
  members: undefined,
  lastKey: null,
  paginating: false,
  activeRoom: null,
  socketReady: false,
  actionPending: false,
  selectedRoomInfo: undefined,
  error: undefined,
}

let newMessagesList: MessageType[] | undefined
let newUsers: ChatRoomMemberItem[] | undefined
let result: MessageType[] | undefined
let pending: MessageType[] | undefined
let oldMessages: MessageType[] | undefined
let newMsg: MessageType[] | undefined
let newRoomList: ChatDataType[] | undefined
let deleted: MessageType[] | undefined

const socketReducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case CHAT_ACTION_TYPE.GET_ALL_ROOMS:
      return {
        ...state,
        roomList: action.data.content,
      }
    case CHAT_ACTION_TYPE.MESSAGE_PAGINATING:
      return {
        ...state,
        paginating: true,
      }
    case CHAT_ACTION_TYPE.GET_ROOM_MESSAGES:
      if (action.data.content === [] || action.data.content.length === 0) {
        // case when socket error or wrong data return from server
        newMessagesList = []
        newUsers = action.data.members
      } else if (state.lastKey != null && state.activeRoom === action.data.chatRoomId) {
        //paginating data merging
        const prevArray = state.messages
        const temp = _.concat(action.data.content, prevArray)
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
        roomList: ChatHelper.unseenClear(state.roomList, action.data.chatRoomId),
        error: _.get(action.data, 'error', undefined),
      }
    case CHAT_ACTION_TYPE.MESSAGE_PENDING:
      if (_.isArray(state.messages) && _.isEmpty(state.messages)) {
        pending = [action.data]
      } else {
        pending = _.concat(state.messages, action.data)
      }
      return {
        ...state,
        messages: pending,
      }

    case CHAT_ACTION_TYPE.CLEAN_ROOM:
      return {
        ...state,
        messages: undefined,
        selectedRoomInfo: undefined,
        newRoomId: undefined,
        error: undefined,
      }
    case CHAT_ACTION_TYPE.SEND_MESSAGE:
      oldMessages = state.messages
      newMsg = action.data.content
      if (state.activeRoom != null && state.activeRoom === newMsg[0]['chatRoomId']) {
        const mergedMsg = ChatHelper.messagesMerge(oldMessages ? [...oldMessages] : [], newMsg)
        result = mergedMsg
      } else {
        result = oldMessages
      }
      return {
        ...state,
        messages: result,
        roomList: ChatHelper.roomListUpdate([...state.roomList], newMsg, state.activeRoom),
      }
    case CHAT_ACTION_TYPE.ROOM_CREATE_PENDING:
      return {
        ...state,
        actionPending: true,
      }
    case CHAT_ACTION_TYPE.GET_ROOM_AND_MESSAGE:
      return {
        ...state,
        selectedRoomInfo: _.get(action.data, 'content.room', undefined),
      }
    case CHAT_ACTION_TYPE.CREATE_ROOM:
      newRoomList = [...state.roomList]
      newRoomList.push(action.data.content)
      return {
        ...state,
        actionPending: false,
        roomList: newRoomList,
        newRoomId: action.data.content.chatRoomId,
      }
    case CHAT_ACTION_TYPE.ROOM_CHANGED:
      return ChatHelper.changeSingleRoom(state, action.data.content)
    case CHAT_ACTION_TYPE.CLEAR_NEW_ROOM_ID:
      return {
        ...state,
        newRoomId: undefined,
      }
    case CHAT_ACTION_TYPE.GET_ROOM_MEMBERS:
      return {
        ...state,
        members: action.data.content,
      }
    case CHAT_ACTION_TYPE.REMOVE_MEMBER:
      return {
        ...state,
        members: action.data.content,
      }

    case CHAT_ACTION_TYPE.MESSAGE_DELETED:
      if (!_.isEmpty(state.messages)) {
        const deletedMsg = ChatHelper.deleteMessage([...state.messages], action.data.content)
        deleted = deletedMsg
      } else {
        deleted = state.messages
      }
      return {
        ...state,
        messages: deleted,
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
