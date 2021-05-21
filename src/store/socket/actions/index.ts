/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { WEBSOCKET_PREFIX, CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { AppDispatch } from '@store/store'
import _ from 'lodash'

interface SocketPayload {
  action: CHAT_ACTION_TYPE
  userId?: number
  [x: string]: any
}

export const socketActions = {
  socketSend: (payload: SocketPayload) => {
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
  socketSend: (payload: SocketPayload) => ({
    type: `${WEBSOCKET_PREFIX}:SEND`,
    payload: payload,
  }),
  messagePending: (payload: any) => ({
    type: CHAT_ACTION_TYPE.MESSAGE_PENDING,
    data: _.omit(_.assign(payload, { sent: false }), ['action']),
  }),
}
