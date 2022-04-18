import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import authStore from '@store/auth'
import { clearMetaData } from '@store/metadata/actions'

const { actions, selectors: userProfileSelectors } = userProfile
const { selectors } = authStore
const getChangeEmailConfirmMeta = createMetaSelector(actions.changeEmailConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangeEmailConfirm = (confirmationCode: string) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const changeEmailSteps = useAppSelector(userProfileSelectors.getChangeEmailSteps)
  const resetMeta = () => dispatch(clearMetaData(actions.changeEmailConfirm.typePrefix))
  const meta = useAppSelector(getChangeEmailConfirmMeta)
  const newEmail = useAppSelector(userProfile.selectors.getNewEmail)
  const changeEmailConfirm = (params: services.ChangeEmailConfirmParams) => {
    dispatch(actions.changeEmailConfirm(params))
  }

  useEffect(() => {
    if (meta.loaded) {
      router.push(ESRoutes.USER_ACCOUNT_SETTINGS)
    }
  }, [meta.loaded])

  useEffect(() => {
    return () => resetMeta()
  }, [])

  useEffect(() => {
    if (confirmationCode && !!meta.error) {
      resetMeta()
    }
  }, [confirmationCode])

  useEffect(() => {
    if (!changeEmailSteps.step_change) {
      // eslint-disable-next-line no-console
      console.log('backToTopVideo::back::15')
      router.back()
    }
  }, [changeEmailSteps.step_change])

  return { changeEmailConfirm, meta, user, changeEmailSteps, newEmail }
}

export default useChangeEmailConfirm
