import { StoreType, AppDispatch } from '@store/store'
import { Middleware, Action } from 'redux'
import _ from 'lodash'
import { createLobby, updateLobby, entryLobby, unjoinLobby, confirmParticipants } from '@store/lobby/actions/index'
import i18n from '@locales/i18n'
import { addToast } from '@store/common/actions'
import { getLobbyDetail } from '@store/lobby/actions'

const messages = {
  [`${createLobby.fulfilled}`]: i18n.t('common:lobby.toast.create'),
  [`${updateLobby.fulfilled}`]: i18n.t('common:lobby.toast.edit'),
}

const fetchDetail = (store: StoreType) => {
  const hashKey = store.getState().lobby.lobbyDetail?.attributes?.hash_key
  hashKey && store.dispatch(getLobbyDetail(hashKey))
}

const actions = {
  [`${entryLobby.fulfilled}`]: fetchDetail,
  [`${unjoinLobby.fulfilled}`]: fetchDetail,
  [`${confirmParticipants.fulfilled}`]: fetchDetail,
}

export const lobbyMiddlware: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const message = messages[action.type]
  const lobbyAction = actions[action.type]

  if (lobbyAction) lobbyAction(store)

  if (message && !_.isEmpty(message)) store.dispatch(addToast(message))

  return next(action)
}
