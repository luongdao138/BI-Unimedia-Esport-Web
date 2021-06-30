import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as services from '@services/user.service'
import { createMetaSelector } from '@store/metadata/selectors'
import userProfile from '@store/userProfile'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import authStore from '@store/auth'
import { clearMetaData } from '@store/metadata/actions'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'

const { actions, selectors: userProfileSelectors } = userProfile
const { selectors } = authStore
const getChangeEmailConfirmMeta = createMetaSelector(actions.changeEmailConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useChangeEmailConfirm = (confirmationCode: string) => {
  const { t } = useTranslation('common')
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
      dispatch(commonActions.addToast(''))
      router.push(ESRoutes.USER_ACCOUNT_SETTINGS)
    }
  }, [meta.loaded])

  useEffect(() => {
    if (confirmationCode && !!meta.error) {
      resetMeta()
    }
  }, [confirmationCode])

  useEffect(() => {
    if (meta.error) {
      dispatch(commonActions.addToast(t('error.invalid_confirmation')))
    }
  }, [meta.error])

  useEffect(() => {
    if (!changeEmailSteps.step_change) {
      router.back()
    }
  }, [changeEmailSteps.step_change])

  return { changeEmailConfirm, meta, user, changeEmailSteps, newEmail }
}

export default useChangeEmailConfirm
