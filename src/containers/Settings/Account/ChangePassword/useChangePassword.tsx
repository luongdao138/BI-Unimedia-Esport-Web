import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import useReturnHref from '@utils/hooks/useReturnHref'
import { ESRoutes } from '@constants/route.constants'

const { actions } = userProfile
const getChangePasswordMeta = createMetaSelector(actions.changePassword)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangePassword = () => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getChangePasswordMeta)
  const { navigateScreen } = useReturnHref()

  const changePassword = (params: services.ChangePasswordParams) => {
    dispatch(actions.changePassword(params))
  }

  useEffect(() => {
    if (meta.loaded) {
      navigateScreen(ESRoutes.USER_ACCOUNT_SETTINGS)
    }
  }, [meta.loaded])

  return { changePassword, meta }
}

export default useChangePassword
