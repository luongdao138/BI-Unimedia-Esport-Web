import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import useReturnHref from '@utils/hooks/useReturnHref'
import { ESRoutes } from '@constants/route.constants'
import authStore from '@store/auth'

const { selectors } = authStore
const { actions } = userProfile
const getChangeEmailMeta = createMetaSelector(actions.changeEmail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangeEmail = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getChangeEmailMeta)
  const { navigateScreen } = useReturnHref()

  const changeEmail = (params: services.ChangeEmailParams) => {
    dispatch(actions.changeEmail(params))
  }

  useEffect(() => {
    if (meta.loaded) {
      navigateScreen(ESRoutes.USER_ACCOUNT_SETTINGS_EMAIL_CONFIRM)
    }
  }, [meta.loaded])

  return { changeEmail, meta, user }
}

export default useChangeEmail
