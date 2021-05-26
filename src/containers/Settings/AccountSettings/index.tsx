import { useTranslation } from 'react-i18next'
import HeaderWithButton from '@components/HeaderWithButton'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { SNS } from '@constants/common.constants'
import ESButton from '@components/Button'
import SettingsItem from './SettingsItem'

const AccountSettingsContainer: React.FC = () => {
  const { t } = useTranslation('common')
  // const hasEmail = CommonHelper.hasEmail('')
  const hasEmail = CommonHelper.hasEmail('sample@gmail.com')
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  const openPasswordModal = () =>
    router.push(makeContextualHref({ pathName: ESRoutes.USER_ACCOUNT_SETTINGS_PASSWORD }), ESRoutes.USER_ACCOUNT_SETTINGS_PASSWORD, {
      shallow: true,
    })

  const openEmailModal = () =>
    router.push(makeContextualHref({ pathName: ESRoutes.USER_ACCOUNT_SETTINGS_PASSWORD }), ESRoutes.USER_ACCOUNT_SETTINGS_PASSWORD, {
      shallow: true,
    })

  return (
    <>
      <HeaderWithButton title={t('account_settings.title')} />
      <Box>
        <SettingsItem title={t('account_settings.membership_type')} value={'一般会員'} disabled />
        <SettingsItem title={t('common.user_id')} value={'@exelab_staff'} disabled />
        <SettingsItem
          title={t('common.mail_address')}
          value={hasEmail ? 'sample@gmail.com' : t('account_settings.sns')}
          route={hasEmail ? '/account_settings' : SNS}
          onChangeEmail={openEmailModal}
        />
        <SettingsItem
          title={t('common.password')}
          value={'password123'}
          invisible
          route={hasEmail ? '/account_settings' : SNS}
          onChangePassword={openPasswordModal}
          password
        />
      </Box>
      <Box my={4} display="flex" justifyContent="center">
        <ESButton variant="outlined">{t('account_settings.delete_account')}</ESButton>
      </Box>
    </>
  )
}

export default AccountSettingsContainer
