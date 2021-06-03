import { useTranslation } from 'react-i18next'
import HeaderWithButton from '@components/HeaderWithButton'
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core'
import { useAppSelector } from '@store/hooks'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { SNS } from '@constants/common.constants'
import ESButton from '@components/Button'
import SettingsItem from './SettingsItem'
import authStore from '@store/auth'
import useAccount from './useAccount'

const AccountSettingsContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const { selectors } = authStore
  const user = useAppSelector(selectors.getAuth)
  const hasEmail = CommonHelper.hasEmail(user?.email)
  const router = useRouter()
  const { resetSteps } = useAccount()

  const openEmailModal = () => {
    resetSteps()
    router.push('#password', undefined, { shallow: true })
  }

  const openPasswordModal = () => {
    resetSteps()
    router.push('#change-password', undefined, { shallow: true })
  }

  return (
    <>
      <HeaderWithButton title={t('account_settings.title')} />
      <Box>
        <SettingsItem title={t('account_settings.membership_type')} value={t('account_settings.general_member')} disabled />
        <SettingsItem title={t('common.user_id')} value={user?.user_code && '@' + user.user_code} disabled />
        <SettingsItem
          title={t('common.mail_address')}
          value={hasEmail ? user.email : t('account_settings.sns')}
          route={hasEmail && !user.is_social ? '/account_settings' : SNS}
          onChangeEmail={openEmailModal}
          showButton={true}
        />
        <SettingsItem
          title={t('common.password')}
          value={user?.is_social ? SNS : ''}
          invisible={!user?.is_social}
          route={hasEmail && !user.is_social ? '/account_settings' : SNS}
          onChangePassword={openPasswordModal}
          password
          showButton={true}
        />
      </Box>
      <Box my={4} display="flex" justifyContent="center">
        <ESButton variant="outlined">{t('account_settings.delete_account')}</ESButton>
      </Box>
    </>
  )
}

export default AccountSettingsContainer
