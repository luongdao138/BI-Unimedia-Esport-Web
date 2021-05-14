/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { AppDispatch } from '@store/store'

export const socketActions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  socketSend: (payload: object) => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.socketSend(payload))
    }
  },
}

export const socketCreators = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  socketSend: (payload: object) => ({
    type: `${WEBSOCKET_PREFIX}:SEND`,
    payload: payload,
  }),
}
