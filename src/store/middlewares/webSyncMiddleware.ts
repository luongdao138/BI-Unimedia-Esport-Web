import { WEBSYNC_PREFIX, AppSyncActionType } from '@constants/sync.constants'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { v1 as uuidv1 } from 'uuid'
import { Action, Middleware } from 'redux'
import { StoreType, AppDispatch } from '@store/store'
import notificationStore from '@store/notification'
const DEVICE_ID = uuidv1()
let socket: any = null
const notificationActions = notificationStore.actions

const onOpen = (store: StoreType) => (_event: Event) => {
  const userId = store.getState().auth.user?.id
  if (userId) {
    // eslint-disable-next-line no-console
    console.log('sync connected')
  }
}

const onClose = (store: StoreType) => (_event: CloseEvent) => {
  store.dispatch({ type: `${WEBSYNC_PREFIX}:DISCONNECTED` })
}

const onMessage = (store: StoreType) => (event: MessageEvent) => {
  const message = JSON.parse(event.data)
  if (message && message.action !== undefined && message.action !== null) {
    switch (message.action) {
      case AppSyncActionType.NOTIFICATION:
        store.dispatch(notificationActions.getNotificationBadge())
        store.dispatch(notificationActions.notifications({ page: 1 }))
        break
      default:
    }
  } else {
    store.dispatch({
      type: `${WEBSYNC_PREFIX}:FAILURE`,
      data: message,
    })
  }
}

const closeExisting = () => {
  if (socket !== null) {
    socket.close()
  }
}

export const webSyncMiddle: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const connect = () => {
    const accessToken = store.getState().auth.user?.accessToken
    const encrypted = btoa(accessToken)
    closeExisting()
    const uri = `${process.env.NEXT_PUBLIC_SYNC_BACKEND_END_POINT}/?accessToken=${encrypted}&deviceId=${DEVICE_ID + '11'}&appVersion=web_v2`
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
    [`${WEBSYNC_PREFIX}:CONNECT`]: connect,
    [`${WEBSYNC_PREFIX}:DISCONNECT`]: disconnect,
    [`${WEBSYNC_PREFIX}:SEND`]: send,
  }

  const handler = actionHandlers[action.type]

  if (handler) handler(action)

  return next(action)
}
