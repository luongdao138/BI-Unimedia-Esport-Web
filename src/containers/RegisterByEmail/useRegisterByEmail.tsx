import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'
import { UserLoginParams } from '@services/auth.service'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'
import { registerLoading } from '@store/auth/selectors'

const { selectors, actions } = authStore
const getRegisterMeta = createMetaSelector(actions.registerByEmail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRegisterByEmail = () => {
  const { navigateScreen, handleReturn } = useReturnHref()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getRegisterMeta)

  const registerByEmail = (param: UserLoginParams) => dispatch(actions.registerByEmail(param))
  const registerByEmailLoading = useAppSelector(registerLoading)

  const resetMeta = () => dispatch(clearMetaData(actions.registerByEmail.typePrefix))

  const backAction = () => {
    resetMeta()
    handleReturn()
  }

  useEffect(() => {
    if (meta.loaded) {
      navigateScreen(ESRoutes.REGISTER_CONFIRM)
      resetMeta()
    }
  }, [meta.loaded])

  return { user, registerByEmail, resetMeta, meta, backAction, registerByEmailLoading }
}

export default useRegisterByEmail
