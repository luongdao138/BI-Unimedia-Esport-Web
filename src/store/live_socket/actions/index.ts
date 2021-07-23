import { WEBSOCKET_PREFIX, STREAM_CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { AppDispatch } from '@store/store'

export const socketActions = {
  socketSend: (payload: any) => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.socketSend(payload))
    }
  },
  setCount: (data) => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.setCount(data))
    }
  },
  resetConnection: () => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.resetConnection())
    }
  },
}

export const socketCreators = {
  socketSend: (payload: any) => ({
    type: `${WEBSOCKET_PREFIX}:SEND`,
    payload: payload,
  }),
  setCount: (data: any) => ({
    type: STREAM_CHAT_ACTION_TYPE.COUNT_CHANGED,
    data: { content: data },
  }),
  resetConnection: () => ({
    type: STREAM_CHAT_ACTION_TYPE.RESET_CONNECTION,
  }),
}
