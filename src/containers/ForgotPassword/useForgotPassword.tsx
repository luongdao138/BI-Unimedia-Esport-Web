import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { ForgotPasswordParams, UserResetPasswordParams } from '@services/auth.service'
import { clearMetaData } from '@store/metadata/actions'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'

const { selectors, actions } = authStore
const getForgotPasswordMeta = createMetaSelector(actions.forgotPassword)
const getForgotConfirmMeta = createMetaSelector(actions.forgotConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useForgotPassword = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getForgotPasswordMeta)
  const metaConfirm = useAppSelector(getForgotConfirmMeta)
  const { navigateScreen, handleReturn } = useReturnHref()

  const forgotPassword = (params: ForgotPasswordParams) => dispatch(actions.forgotPassword(params))

  const resetPassword = (params: UserResetPasswordParams) => {
    dispatch(actions.resetPassword(params))
  }

  const backAction = () => handleReturn()

  useEffect(() => {
    if (meta.loaded) {
      navigateScreen(ESRoutes.FORGOT_PASSWORD_CONFIRM)
      dispatch(clearMetaData(actions.forgotPassword.typePrefix))
    }
  }, [meta.loaded])

  return {
    user,
    forgotPassword,
    resetPassword,
    meta,
    metaConfirm,
    backAction,
  }
}

export default useForgotPassword
