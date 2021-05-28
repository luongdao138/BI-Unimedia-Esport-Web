import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import useReturnHref from '@utils/hooks/useReturnHref'
import { ESRoutes } from '@constants/route.constants'

const { actions } = userProfile
const getChangeEmailCheckMeta = createMetaSelector(actions.changeEmailCheck)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePassword = () => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getChangeEmailCheckMeta)
  const { navigateScreen } = useReturnHref()

  const changeEmailCheck = (params: services.ChangeEmailCheckParams) => {
    dispatch(actions.changeEmailCheck(params))
  }

  useEffect(() => {
    if (meta.loaded) {
      navigateScreen(ESRoutes.USER_ACCOUNT_SETTINGS_CHANGE_EMAIL)
    }
  }, [meta.loaded])

  return { changeEmailCheck, meta }
}

export default usePassword
