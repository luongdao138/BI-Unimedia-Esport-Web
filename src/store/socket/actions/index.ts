/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { AppDispatch } from '@store/store'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import _ from 'lodash'

export const socketActions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  socketSend: (payload: object) => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.socketSend(payload))
    }
  },
  sendMessage: (payload: any) => {
    return (dispatch: AppDispatch) => {
      Promise.resolve(dispatch(socketCreators.messagePending(payload))).then(() => dispatch(socketCreators.socketSend(payload)))
    }
  },
}

export const socketCreators = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  socketSend: (payload: object) => ({
    type: `${WEBSOCKET_PREFIX}:SEND`,
    payload: payload,
  }),
  messagePending: (payload: any) => ({
    type: CHAT_ACTION_TYPE.MESSAGE_PENDING,
    data: _.omit(_.assign(payload, { sent: false }), ['action']),
  }),
}
