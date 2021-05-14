import { WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { AppDispatch } from '@store/store'

export const socketActions = {
  socketSend: (payload: any) => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.socketSend(payload))
    }
  },
}

export const socketCreators = {
  socketSend: (payload: any) => ({
    type: `${WEBSOCKET_PREFIX}:SEND`,
    payload: payload,
  }),
}
