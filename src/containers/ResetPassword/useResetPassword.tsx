import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import authStore from '@store/auth'
import { UserResetPasswordParams } from '@services/auth.service'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'

const { actions, selectors } = authStore
const getResetPasswordMeta = createMetaSelector(actions.resetPassword)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useResetPassword = () => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getResetPasswordMeta)
  const user = useAppSelector(selectors.getAuth)
  const { navigateScreen } = useReturnHref()

  const resetPassword = (param: UserResetPasswordParams) => dispatch(actions.resetPassword(param))

  const backAction = () => navigateScreen(ESRoutes.FORGOT_PASSWORD)

  useEffect(() => {
    if (meta.loaded) {
      navigateScreen(ESRoutes.LOGIN)
    }
  }, [meta.loaded])

  return { user, resetPassword, meta, backAction }
}

export default useResetPassword
