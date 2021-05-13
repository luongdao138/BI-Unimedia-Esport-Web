import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { UserConfirmParams } from '@services/auth.service'
import { clearMetaData } from '@store/metadata/actions'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'

const { selectors, actions } = authStore
const getForgotConfirm = createMetaSelector(actions.forgotConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useForgotConfirm = (confirmationCode: string) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const metaConfirm = useAppSelector(getForgotConfirm)
  const { navigateScreen } = useReturnHref()

  const forgotConfirm = (params: UserConfirmParams) => dispatch(actions.forgotConfirm(params))

  const resetMeta = () => dispatch(clearMetaData(actions.forgotConfirm.typePrefix))

  const backAction = () => navigateScreen(ESRoutes.FORGOT_PASSWORD)

  useEffect(() => {
    if (metaConfirm.loaded) {
      navigateScreen(ESRoutes.FORGOT_PASSWORD_RESET)
      resetMeta()
    }
  }, [metaConfirm.loaded])

  useEffect(() => {
    if (confirmationCode && !!metaConfirm.error) {
      resetMeta()
    }
  }, [confirmationCode])

  useEffect(() => {
    if (user === undefined) {
      navigateScreen(ESRoutes.FORGOT_PASSWORD)
    }
  }, [])

  return {
    user,
    forgotConfirm,
    metaConfirm,
    resetMeta,
    backAction,
  }
}

export default useForgotConfirm
