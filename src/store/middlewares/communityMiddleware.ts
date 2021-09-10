import { StoreType, AppDispatch } from '@store/store'
import { Middleware, Action } from 'redux'
import _ from 'lodash'
import { unfollowCommunity } from '@store/community/actions/index'
import i18n from '@locales/i18n'
import { addToast } from '@store/common/actions'

const messages = {
  [`${unfollowCommunity.fulfilled}`]: i18n.t('common:community.toast_unfollowed'),
}

export const communityMiddleware: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const message = messages[action.type]

  if (message && !_.isEmpty(message)) store.dispatch(addToast(message))

  return next(action)
}
