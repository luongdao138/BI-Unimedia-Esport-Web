import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { UserConfirmParams, UserResendParams } from '@services/auth.service'
import { clearMetaData } from '@store/metadata/actions'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'
import Router from 'next/router'

const { selectors, actions } = authStore
const getRegisterConfirmMeta = createMetaSelector(actions.registerConfirm)
const getResendMeta = createMetaSelector(actions.signUpResend)
const getResendForgotMeta = createMetaSelector(actions.forgotResend)
const getForgotConfirm = createMetaSelector(actions.forgotConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useConfirm = (confirmationCode: string) => {
  const { navigateScreen, handleReturn } = useReturnHref()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const metaConfirm = useAppSelector(getRegisterConfirmMeta)
  const metaForgot = useAppSelector(getForgotConfirm)
  const metaResend = useAppSelector(getResendMeta)
  const metaResendForgot = useAppSelector(getResendForgotMeta)
  const confirmType = useAppSelector(selectors.getConfirmType)

  const registerConfirm = (params: UserConfirmParams) => {
    if (confirmType === 'register') {
      dispatch(actions.registerConfirm(params))
    } else {
      dispatch(actions.forgotConfirm(params))
    }
  }

  const resendConfirmation = (params: UserResendParams) => {
    if (confirmType === 'register') {
      dispatch(actions.signUpResend(params))
    } else {
      dispatch(actions.forgotResend(params))
    }
  }

  const resetMeta = () => {
    dispatch(clearMetaData(actions.forgotConfirm.typePrefix))
    dispatch(clearMetaData(actions.registerConfirm.typePrefix))
  }

  const resetResendMeta = () => {
    dispatch(clearMetaData(actions.forgotResend.typePrefix))
    dispatch(clearMetaData(actions.signUpResend.typePrefix))
  }

  const backAction = () => {
    handleReturn()
    resetMeta()
  }

  useEffect(() => {
    if (metaConfirm.loaded || metaForgot.loaded) {
      if (confirmType === 'register') {
        navigateScreen(ESRoutes.REGISTER_PROFILE)
      } else {
        navigateScreen(ESRoutes.FORGOT_PASSWORD_RESET)
      }
      resetMeta()
    }
  }, [metaConfirm.loaded, metaForgot.loaded])

  useEffect(() => {
    if (confirmationCode && (!!metaConfirm.error || !!metaForgot.error)) {
      resetMeta()
    }
  }, [confirmationCode])

  useEffect(() => {
    if (confirmType === 'register') {
      Router.prefetch(ESRoutes.REGISTER_PROFILE)
    } else {
      Router.prefetch(ESRoutes.FORGOT_PASSWORD_RESET)
    }
  }, [])

  return {
    user,
    registerConfirm,
    metaConfirm,
    metaForgot,
    resetMeta,
    backAction,
    resendConfirmation,
    metaResend,
    metaResendForgot,
    resetResendMeta,
  }
}

export default useConfirm
