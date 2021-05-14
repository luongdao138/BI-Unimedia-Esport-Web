import { loginByEmail, loginSocial, registerConfirm } from '@store/auth/actions'
import { StoreType, AppDispatch } from '@store/store'
import { getUserProfile } from '@store/userProfile/actions'
import { Middleware, Action } from 'redux'
export const authMiddleware: Middleware = (store: StoreType) => (next: AppDispatch) => <A extends Action>(action: A): A => {
  const types = [loginByEmail.fulfilled.type, loginSocial.fulfilled.type, registerConfirm.fulfilled.type]
  if (types.includes(action.type)) {
    store.dispatch(getUserProfile())
  }
  return next(action)
}
