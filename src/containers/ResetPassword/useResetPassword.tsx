import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserResetPasswordParams } from '@services/auth.service'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'
import { useRouter } from 'next/router'

const { actions, selectors } = authStore
const getResetPasswordMeta = createMetaSelector(actions.resetPassword)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useResetPassword = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getResetPasswordMeta)
  const user = useAppSelector(selectors.getAuth)
  const { navigateScreen } = useReturnHref()

  const resetPassword = (param: UserResetPasswordParams) => dispatch(actions.resetPassword(param))

  const resetMeta = () => dispatch(clearMetaData(actions.resetPassword.typePrefix))

  const backAction = () => navigateScreen(ESRoutes.FORGOT_PASSWORD)

  useEffect(() => {
    if (meta.loaded) {
      router.push(ESRoutes.HOME)
      resetMeta()
    }
  }, [meta.loaded])

  return { user, resetPassword, meta, backAction, resetMeta }
}

export default useResetPassword
