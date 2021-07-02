import { WEBSOCKET_PREFIX, CHAT_ACTION_TYPE } from '@constants/socket.constants'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { v4 as uuidv4 } from 'uuid'
import { Action, Middleware } from 'redux'
import { StoreType, AppDispatch } from '@store/store'
import { socketActions } from '@store/socket/actions'
import { logout } from '@store/auth/actions'

const DEVICE_ID = uuidv4()

let socket: any = null

const onOpen = (store: StoreType) => (_event: Event) => {
  const userId = store.getState().auth.user?.id
  if (userId) {
    // eslint-disable-next-line no-console
    console.log('connected, end fetching list')
    store.dispatch({ type: `${WEBSOCKET_PREFIX}:CONNECTED` })
    store.dispatch(
      socketActions.socketSend({
        action: CHAT_ACTION_TYPE.GET_ALL_ROOMS,
      })
    )
  }
}

const onClose = (store: StoreType) => (_event: CloseEvent) => {
  store.dispatch({ type: `${WEBSOCKET_PREFIX}:DISCONNECTED` })
}

const onMessage = (store: StoreType) => (event: MessageEvent) => {
  const message = JSON.parse(event.data)

  if (message && message.action) {
    if (message.action === CHAT_ACTION_TYPE.REFRESH_MEMBERS) {
      const userId = store.getState().auth.user?.id
      if (!userId) return
      socket.send(
        JSON.stringify({
          action: CHAT_ACTION_TYPE.GET_ROOM_MEMBERS,
          roomId: message.content.roomId,
        })
      )
    } else if (message.action === CHAT_ACTION_TYPE.MEMBER_ADDED) {
      socket.send(
        JSON.stringify({
          action: CHAT_ACTION_TYPE.GET_ROOM_MEMBERS,
          roomId: message.content.roomId,
        })
      )
    } else {
      store.dispatch({ type: message.action, data: message })
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
    const accessToken = store.getState().auth.user?.accessToken
    const encrypted = btoa(accessToken)
    closeExisting()
    const uri = `${process.env.NEXT_PUBLIC_CHAT_END_POINT}/?accessToken=${encrypted}&deviceId=${DEVICE_ID}&appVersion=web_v2`
    socket = new ReconnectingWebSocket(uri)
    socket.onmessage = onMessage(store)
    socket.onclose = onClose(store)
    socket.onopen = onOpen(store)
  }

  const disconnect = () => {
    // store.dispatch({ type: 'toast/addToast', payload: 'disconnected' })
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
    [logout.fulfilled.type]: disconnect,
  }

  const handler = actionHandlers[action.type]

  if (handler) handler(action)

  return next(action)
}
