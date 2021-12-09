import { SYSTEMSYNC_PREFIX, SYSTEMSYNC_ACTION_TYPE } from '@constants/socket.constants'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { Action, Middleware } from 'redux'
import { StoreType, AppDispatch } from '@store/store'
import { logout } from '@store/auth/actions'
import { getTournamentDetail } from '@store/arena/actions'
import { getLobbyDetail } from '@store/lobby/actions'
import { getCommentsList } from '@store/community/actions'

let socket: any = null

const onOpen = (store: StoreType) => (_event: Event) => {
  const userId = store.getState().auth.user?.id
  if (userId) {
    store.dispatch({ type: `${SYSTEMSYNC_PREFIX}:CONNECTED` })
  }
}

const onClose = (store: StoreType) => (_event: CloseEvent) => {
  store.dispatch({ type: `${SYSTEMSYNC_PREFIX}:DISCONNECTED` })
}

const onMessage = (store: StoreType) => (event: MessageEvent) => {
  const message = JSON.parse(event.data)
  if (message) {
    switch (message.type) {
      case SYSTEMSYNC_ACTION_TYPE.UPDATE_TOURNAMENT_STATUS:
      case SYSTEMSYNC_ACTION_TYPE.UPDATE_TOURNAMENT_SCORE: {
        const { tournamentDetail } = store.getState().arena
        if (tournamentDetail?.id && +message.id === +tournamentDetail.id) {
          store.dispatch(getTournamentDetail(String(tournamentDetail.attributes.hash_key)))
        }
        break
      }
      case SYSTEMSYNC_ACTION_TYPE.UPDATE_RECRUITMENT_STATUS: {
        const { lobbyDetail } = store.getState().lobby
        if (lobbyDetail?.id && +message.id === +lobbyDetail.id) {
          store.dispatch(getLobbyDetail(String(lobbyDetail.attributes.hash_key)))
        }
        break
      }
      case SYSTEMSYNC_ACTION_TYPE.CREATE_TOPIC_COMMENT: {
        const { topicDetail } = store.getState().community
        if (topicDetail?.id && +message.id === +topicDetail.id) {
          store.dispatch(getCommentsList({ hash_key: topicDetail.attributes.hash_key, page: 1 }))
        }
        break
      }
      default:
        break
    }
  } else {
    store.dispatch({
      type: `${SYSTEMSYNC_PREFIX}:FAILURE`,
      data: message,
    })
  }
}

const closeExisting = () => {
  if (socket !== null) {
    socket.close()
  }
}

export const systemSyncMiddleware: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const connect = () => {
    closeExisting()
    const uri = process.env.NEXT_PUBLIC_SYSTEM_SYNC_END_POINT
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
    [`${SYSTEMSYNC_PREFIX}:CONNECT`]: connect,
    [`${SYSTEMSYNC_PREFIX}:DISCONNECT`]: disconnect,
    [`${SYSTEMSYNC_PREFIX}:SEND`]: send,
    [logout.fulfilled.type]: disconnect,
  }

  const handler = actionHandlers[action.type]

  if (handler) handler(action)

  return next(action)
}
