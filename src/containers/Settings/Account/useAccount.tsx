import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfile from '@store/userProfile'
import { createMetaSelector } from '@store/metadata/selectors'
import { addToast } from '@store/common/actions'
import { useTranslation } from 'react-i18next'

const { actions } = userProfile
const getChangePasswordMeta = createMetaSelector(actions.changePassword)
const getChangeConfirmMeta = createMetaSelector(actions.changeEmailConfirm)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAccount = () => {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const metaChangePassword = useAppSelector(getChangePasswordMeta)
  const metaChangeEmailConfirm = useAppSelector(getChangeConfirmMeta)

  const resetSteps = () => dispatch(actions.clearChangeEmailSteps())

  useEffect(() => {
    if (metaChangePassword.loaded) {
      dispatch(addToast(t('account_settings.change_password_success')))
    }
  }, [metaChangePassword.loaded])

  useEffect(() => {
    if (metaChangeEmailConfirm.loaded) {
      dispatch(addToast(t('account_settings.change_email_success')))
    }
  }, [metaChangeEmailConfirm.loaded])

  return { resetSteps }
}

export default useAccount
