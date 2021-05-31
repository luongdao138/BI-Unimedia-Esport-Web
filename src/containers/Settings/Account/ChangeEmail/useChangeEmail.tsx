import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import useReturnHref from '@utils/hooks/useReturnHref'
import { ESRoutes } from '@constants/route.constants'
import authStore from '@store/auth'
import { clearMetaData } from '@store/metadata/actions'
import { useRouter } from 'next/router'

const { selectors } = authStore
const { actions, selectors: userProfileSelectors } = userProfile
const getChangeEmailMeta = createMetaSelector(actions.changeEmail)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangeEmail = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(getChangeEmailMeta)
  const changeEmailSteps = useAppSelector(userProfileSelectors.getChangeEmailSteps)
  const resetMeta = () => dispatch(clearMetaData(actions.changeEmail.typePrefix))
  const { navigateScreen } = useReturnHref()

  const changeEmail = (params: services.ChangeEmailParams) => {
    dispatch(actions.changeEmail(params))
  }

  useEffect(() => {
    if (meta.loaded) {
      navigateScreen(ESRoutes.USER_ACCOUNT_SETTINGS_EMAIL_CONFIRM)
      resetMeta()
    }
  }, [meta.loaded])

  useEffect(() => {
    if (!changeEmailSteps.step_check) {
      router.back()
    }
  }, [changeEmailSteps.step_check])

  return { changeEmail, meta, user, changeEmailSteps }
}

export default useChangeEmail
