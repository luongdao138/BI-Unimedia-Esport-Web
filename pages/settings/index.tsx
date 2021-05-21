import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import SettingsRowItem from '@components/SettingsRowItem'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const SettingsPage: PageWithLayoutType = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('settings.title')} />
      <Box>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_ACCOUNT_SETTINGS)
          }}
        >
          <SettingsRowItem key="account_settings" title={t('settings.account_settings')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_SECURITY_SETTINGS)
          }}
        >
          <SettingsRowItem key="security" title={t('settings.security_settings')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_SECURITY_SETTINGS)
          }}
        >
          <SettingsRowItem key="notification_settings" title={t('settings.notification_settings')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_SECURITY_SETTINGS)
          }}
        >
          <SettingsRowItem key="purchase_history" title={t('settings.purchase_history')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_SECURITY_SETTINGS)
          }}
        >
          <SettingsRowItem key="service_info" title={t('settings.service_info')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_SECURITY_SETTINGS)
          }}
        >
          <SettingsRowItem key="terms" title={t('settings.terms')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_SECURITY_SETTINGS)
          }}
        >
          <SettingsRowItem key="personal_info" title={t('settings.personal_info')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.USER_SECURITY_SETTINGS)
          }}
        >
          <SettingsRowItem key="commercial_transaction" title={t('settings.commercial_transaction')} showSwitch={false} />
        </div>
      </Box>
    </div>
  )
}

SettingsPage.Layout = MainLayout

export default SettingsPage
