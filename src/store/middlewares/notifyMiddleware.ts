import { StoreType, AppDispatch } from '@store/store'
import { Middleware, Action } from 'redux'
import _ from 'lodash'
import { createLobby, updateLobby } from '@store/lobby/actions/index'
import i18n from '@locales/i18n'
import { addToast } from '@store/common/actions'

const messages = {
  [`${createLobby.fulfilled}`]: i18n.t('common:lobby.toast.create'),
  [`${updateLobby.fulfilled}`]: i18n.t('common:lobby.toast.edit'),
}

export const notifyMiddlware: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const message = messages[action.type]

  if (message && !_.isEmpty(message)) store.dispatch(addToast(message))

  return next(action)
}
