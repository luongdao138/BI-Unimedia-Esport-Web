import { State } from '../actions/types'
import { STREAM_CHAT_ACTION_TYPE } from '@constants/socket.constants'
import _ from 'lodash'

const initialState: State = {
  msgList: [],
  roomCount: { messageCount: 0, playCount: 0 },
  connected: false,
}

const socketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case STREAM_CHAT_ACTION_TYPE.INIT_CONNECTION: {
      const _connected = action.data.content?.status == 'success'
      return {
        ...state,
        msgList: [],
        connected: _connected,
      }
    }
    case STREAM_CHAT_ACTION_TYPE.SEND_MESSAGE:
      return {
        ...state,
        msgList: _.concat(state.msgList, action.data.content),
      }

    case STREAM_CHAT_ACTION_TYPE.COUNT_CHANGED:
      return {
        ...state,
        roomCount: action.data.content,
      }

    case STREAM_CHAT_ACTION_TYPE.GET_MESSAGES:
      return {
        ...state,
        msgList: _.concat(action.data.content.reverse(), state.msgList),
      }

    case STREAM_CHAT_ACTION_TYPE.RESET_CONNECTION:
      return {
        ...state,
        connected: false,
      }

    default:
      return state
  }
}

export default socketReducer
