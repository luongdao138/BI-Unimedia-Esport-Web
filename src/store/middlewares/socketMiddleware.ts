import { WEBSOCKET_PREFIX } from '@constants/socket.constants'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { v1 as uuidv1 } from 'uuid'
import { Action, Middleware } from 'redux'
import { StoreType, AppDispatch } from '@store/store'

const DEVICE_ID = uuidv1()

let socket: any = null

const onOpen = (_store: StoreType) => (_event: Event) => {
  // eslint-disable-next-line no-console
  console.log('connected!!')
}

const onClose = (store: StoreType) => (_event: CloseEvent) => {
  store.dispatch({ type: `${WEBSOCKET_PREFIX}:DISCONNECTED` })
}

const onMessage = (store: StoreType) => (event: MessageEvent) => {
  const message = JSON.parse(event.data)
  const accessToken = store.getState().auth.user?.accessToken
  if (message && message.action) {
    store.dispatch({ type: message.action, data: message })
    if (message.action == 'INIT_CONNECTION' && message.content?.status == 'success') {
      socket.send(
        JSON.stringify({
          action: 'GET_MESSAGES',
          ticket: accessToken,
        })
      )
    }
  } else {
    store.dispatch({
      type: `${WEBSOCKET_PREFIX}:FAILURE`,
      data: message,
    })
  }
}

const closeExisting = () => {
  if (socket !== null) {
    socket.close()
  }
}

export const webSocketMiddle: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const connect = () => {
    const currentUser = store.getState().auth.user
    closeExisting()
    const uri = `${process.env.NEXT_PUBLIC_CHAT_END_POINT}/?accessToken=${currentUser?.accessToken}&deviceId=${DEVICE_ID}&appVersion=web_v2`
    socket = new ReconnectingWebSocket(uri)
    socket.onmessage = onMessage(store)
    socket.onclose = onClose(store)
    socket.onopen = onOpen(store)
  }

  const disconnect = () => {
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
    [`${WEBSOCKET_PREFIX}:CONNECT`]: connect,
    [`${WEBSOCKET_PREFIX}:DISCONNECT`]: disconnect,
    [`${WEBSOCKET_PREFIX}:SEND`]: send,
  }

  const handler = actionHandlers[action.type]

  if (handler) handler(action)

  return next(action)
}
