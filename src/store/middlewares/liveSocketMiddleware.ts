import { WEBSOCKET_STREAM_PREFIX, STREAM_CHAT_ACTION_TYPE } from '@constants/socket.constants'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { AUTH_ACTION_TYPE } from '@store/auth/actions/types'
import { v1 as uuidv1 } from 'uuid'

const DEVICE_ID = uuidv1()
const webSocketMiddle = () => {
  let socket: any = null

  const onOpen = (store: any, _eventId: string) => (_event: any) => {
    const userId = store.getState().auth.user?.id
    const accessToken = store.getState().auth.user?.accessToken

    if (userId != null) {
      if (null !== socket && socket) {
        // console.log('eventId', eventId)
        setTimeout(function () {
          const msg = JSON.stringify({
            action: STREAM_CHAT_ACTION_TYPE.INIT_CONNECTION,
            ticket: accessToken,
            deviceId: DEVICE_ID,
          })
          socket.send(msg)
        })
      }
    }
  }
  const onClose = (store) => (_event: any) => {
    store.dispatch({ type: `${WEBSOCKET_STREAM_PREFIX}:DISCONNECTED` })
  }

  const onMessage = (store) => (event) => {
    // console.log('[websocket]socket.onMessage---->', event)
    const message = JSON.parse(event.data)
    const accessToken = store.getState().auth.user?.accessToken
    if (message && message.action) {
      store.dispatch({ type: message.action, data: message })
      if (message.action == STREAM_CHAT_ACTION_TYPE.INIT_CONNECTION && message.content?.status == 'success') {
        socket.send(
          JSON.stringify({
            action: STREAM_CHAT_ACTION_TYPE.GET_MESSAGES,
            ticket: accessToken,
          })
        )
      }
    } else {
      store.dispatch({
        type: `${WEBSOCKET_STREAM_PREFIX}:FAILURE`,
        data: message,
      })
    }
  }

  const onError = (_store, _eventId) => (_event) => {
    // console.log('socket error', event)
    // let isRefreshing = false
    // if (!isRefreshing) {
    //   isRefreshing = true
    //   const { auth } = store.getState()
    //   const user = auth.user
    //   let refreshToken = user.refreshToken
    //   api
    //     .post(URI.REFRESH, {
    //       refresh_token: refreshToken,
    //     })
    //     .then((res) => {
    //       store.dispatch(authActionCreators.loginSuccess(res.data))
    //       // console.log('resdata', res.data)
    //     })
    //     .finally(() => {
    //       isRefreshing = false
    //     })
    // }
  }

  const closeExisting = () => {
    if (socket !== null) {
      socket.close()
    }
  }

  return (store: any) => (next: any) => (action: any) => {
    const connect = (action: any) => {
      const currentUser = store.getState().auth.user
      const eventId = action.payload.eventRoomId
      closeExisting()
      // const options = {
      //   connectionTimeout: 500,
      //   maxRetries: 2,
      // }
      const uri = `${process.env.NEXT_PUBLIC_LIVE_CHAT_WSS}/?ticket=${currentUser?.accessToken}`
      socket = new ReconnectingWebSocket(uri)
      socket.onmessage = onMessage(store)
      socket.onclose = onClose(store)
      socket.onopen = onOpen(store, eventId)
      socket.onerror = onError(store, eventId)
    }

    const disconnect = () => {
      // console.log('disconnect!')
      closeExisting()
      socket = null
    }

    const send = (action: any) => {
      if (socket && socket !== null) {
        setTimeout(function () {
          socket.send(JSON.stringify(action.payload))
        })
      }
    }

    const actionHandlers = {
      [`${WEBSOCKET_STREAM_PREFIX}:CONNECT`]: connect,
      [`${WEBSOCKET_STREAM_PREFIX}:DISCONNECT`]: disconnect,
      [`${WEBSOCKET_STREAM_PREFIX}:SEND`]: send,
      [AUTH_ACTION_TYPE.LOGOUT]: disconnect,
    }

    const handler = actionHandlers[action.type]

    if (handler) handler(action)

    return next(action)
  }
}

export default webSocketMiddle()
