import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { ForgotPasswordParams, UserConfirmParams, UserResetPasswordParams } from '@services/auth.service'

const { selectors, actions } = authStore
const getForgotPasswordMeta = createMetaSelector(actions.forgotPassword)
const getForgotConfirmMeta = createMetaSelector(actions.forgotConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useForgotPassword = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getForgotPasswordMeta)
  const metaConfirm = useAppSelector(getForgotConfirmMeta)

  const forgotPassword = (params: ForgotPasswordParams) => dispatch(actions.forgotPassword(params))

  const forgotConfirm = (params: UserConfirmParams) => {
    dispatch(actions.forgotConfirm(params))
  }

  const resetPassword = (params: UserResetPasswordParams) => {
    dispatch(actions.resetPassword(params))
  }

  return {
    user,
    forgotPassword,
    forgotConfirm,
    resetPassword,
    meta,
    metaConfirm,
  }
}

export default useForgotPassword
