/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { WEBSOCKET_PREFIX, CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { AppDispatch } from '@store/store'
import _ from 'lodash'

interface SocketPayload {
  action: CHAT_ACTION_TYPE
  [x: string]: any
}

export const socketActions = {
  socketSend: (payload: SocketPayload) => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.socketSend(payload))
    }
  },
  messagePending: (payload: SocketPayload) => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.messagePending(payload))
    }
  },
  createChatRoom: (payload: SocketPayload) => {
    return (dispatch: AppDispatch) => {
      Promise.resolve(dispatch(socketCreators.createRoomPending())).then(() => dispatch(socketCreators.socketSend(payload)))
    }
  },
  clearNewRoomId: () => {
    return (dispatch: AppDispatch) => {
      dispatch(socketCreators.clearNewRoomId())
    }
  },
  sendMessage: (payload: SocketPayload) => {
    const socketPayload = _.omit(payload, 'userId')
    return (dispatch: AppDispatch) => {
      Promise.resolve(dispatch(socketCreators.messagePending(payload))).then(() =>
        dispatch(socketCreators.socketSend(socketPayload as SocketPayload))
      )
    }
  },
  initRoomLoad: (payload: SocketPayload) => {
    return (dispatch: AppDispatch) => {
      Promise.resolve(dispatch(socketCreators.cleanRoom())).then(() => dispatch(socketCreators.socketSend(payload)))
    }
  },
  fetchMore: (payload: SocketPayload) => {
    return (dispatch: AppDispatch) => {
      Promise.resolve(dispatch(socketCreators.paginating())).then(() => dispatch(socketCreators.socketSend(payload)))
    }
  },
}

export const socketCreators = {
  socketSend: (payload: SocketPayload) => ({
    type: `${WEBSOCKET_PREFIX}:SEND`,
    payload: payload,
  }),
  messagePending: (payload: SocketPayload) => ({
    type: CHAT_ACTION_TYPE.MESSAGE_PENDING,
    data: _.omit(_.assign(payload, { sent: false }), ['action']),
  }),
  createRoomPending: () => ({
    type: CHAT_ACTION_TYPE.ROOM_CREATE_PENDING,
  }),
  clearNewRoomId: () => ({
    type: CHAT_ACTION_TYPE.CLEAR_NEW_ROOM_ID,
  }),
  paginating: () => ({
    type: CHAT_ACTION_TYPE.MESSAGE_PAGINATING,
  }),
  cleanRoom: () => ({
    type: CHAT_ACTION_TYPE.CLEAN_ROOM,
  }),
}
