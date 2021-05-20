import { State } from '../actions/types'
import { CHAT_ACTION_TYPE, WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { AnyAction } from 'redux'

const initialState: State = {
  roomList: undefined,
  chatMembers: [],
  socketReady: false,
}

const socketReducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case CHAT_ACTION_TYPE.GET_ALL_ROOMS:
      return {
        ...state,
        roomList: action.data.content,
      }
    case CHAT_ACTION_TYPE.GET_ROOM_MEMBERS:
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
