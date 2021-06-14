import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { UserConfirmParams, UserResendParams } from '@services/auth.service'
import { clearMetaData } from '@store/metadata/actions'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'

const { selectors, actions } = authStore
const getRegisterConfirmMeta = createMetaSelector(actions.registerConfirm)
const getResendMeta = createMetaSelector(actions.signUpResend)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useConfirm = (confirmationCode: string) => {
  const { navigateScreen, handleReturn } = useReturnHref()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const metaConfirm = useAppSelector(getRegisterConfirmMeta)
  const metaResend = useAppSelector(getResendMeta)

  const registerConfirm = (params: UserConfirmParams) => dispatch(actions.registerConfirm(params))

  const resendConfirmation = (params: UserResendParams) => dispatch(actions.signUpResend(params))

  const resetMeta = () => dispatch(clearMetaData(actions.registerConfirm.typePrefix))

  const resetResendMeta = () => dispatch(clearMetaData(actions.signUpResend.typePrefix))

  const backAction = () => {
    handleReturn()
    resetMeta()
  }

  useEffect(() => {
    if (metaConfirm.loaded) {
      navigateScreen(ESRoutes.REGISTER_PROFILE)
      resetMeta()
    }
  }, [metaConfirm.loaded])

  useEffect(() => {
    if (confirmationCode && !!metaConfirm.error) {
      resetMeta()
    }
  }, [confirmationCode])

  return {
    user,
    registerConfirm,
    metaConfirm,
    resetMeta,
    backAction,
    resendConfirmation,
    metaResend,
    resetResendMeta,
  }
}

export default useConfirm
