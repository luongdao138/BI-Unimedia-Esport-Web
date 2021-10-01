import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import SettingsRowItem from '@components/SettingsRowItem'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'

const SettingsPage: PageWithLayoutType = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <MainLayout loginRequired={false}>
      <div>
        <HeaderWithButton withBackButton={false} title={t('settings.title')} />
        <Box>
          <LoginRequired>
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
                router.push(ESRoutes.USER_NOTIFICATION_SETTINGS)
              }}
            >
              <SettingsRowItem key="notification_settings" title={t('settings.notification_settings')} showSwitch={false} />
            </div>
            <div
              onClick={() => {
                router.push(ESRoutes.PURCHASE_HISTORY)
              }}
            >
              <SettingsRowItem key="purchase_history" title={t('settings.purchase_history')} showSwitch={false} />
            </div>
          </LoginRequired>
          <div
            onClick={() => {
              router.push(ESRoutes.SERVICE_INFO_SETTINGS)
            }}
          >
            <SettingsRowItem key="service_info" title={t('settings.service_info')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.TERMS)
            }}
          >
            <SettingsRowItem key="terms" title={t('settings.terms')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.PRIVACY)
            }}
          >
            <SettingsRowItem key="personal_info" title={t('settings.personal_info')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.COMMERCIAL)
            }}
          >
            <SettingsRowItem key="commercial_transaction" title={t('settings.commercial_transaction')} showSwitch={false} />
          </div>
        </Box>
      </div>
    </MainLayout>
  )
}

export default SettingsPage
