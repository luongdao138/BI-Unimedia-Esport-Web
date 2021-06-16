import { loginByEmail, loginSocial, registerConfirm } from '@store/auth/actions'
import { StoreType, AppDispatch } from '@store/store'
import { getUserProfile } from '@store/userProfile/actions'
import { Middleware, Action } from 'redux'
import _ from 'lodash'
import { getTournamentDetail, getTournamentParticipants, getTournamentMatches } from '@store/arena/actions/index'
import { setNotFound } from '@store/common/actions'
import { NotFoundType } from '@store/common/actions/types'

export const authMiddleware: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const types = [loginByEmail.fulfilled.type, loginSocial.fulfilled.type, registerConfirm.fulfilled.type]
  const arenaTypes = [getTournamentDetail.rejected.type, getTournamentParticipants.rejected.type, getTournamentMatches.rejected.type]
  if (types.includes(action.type)) {
    store.dispatch(getUserProfile())
  }
  if (arenaTypes.includes(action.type)) {
    const isDisabled = _.get(action, 'payload.error', '') === 'disabled'
    if (isDisabled) {
      store.dispatch(
        setNotFound({
          notFound: NotFoundType.ARENA_NOT_FOUND,
        })
      )
    }
  }

  return next(action)
}
