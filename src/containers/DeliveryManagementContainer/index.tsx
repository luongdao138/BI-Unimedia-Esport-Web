import HeaderWithButton from '@components/HeaderWithButton'
import SettingsRowItem from '@components/SettingsRowItem'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'

const DeliveryManagementContainer: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('delivery_management_screen.title')} />
      <Box>
        <LoginRequired>
          <div
            onClick={() => {
              router.push(ESRoutes.STREAMING_SETTINGS_LIVE_STREAMING)
            }}
          >
            <SettingsRowItem key="delivery_settings" title={t('delivery_management_screen.delivery_settings')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.STREAMING_SETTINGS_LIVE_STREAMING)
            }}
          >
            <SettingsRowItem
              key="distribution_data_management"
              title={t('delivery_management_screen.distribution_data_management')}
              showSwitch={false}
            />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.STREAMING_SETTINGS_LIVE_STREAMING)
            }}
          >
            <SettingsRowItem key="archive_list" title={t('delivery_management_screen.archive_list')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.STREAMING_SETTINGS_LIVE_STREAMING)
            }}
          >
            <SettingsRowItem key="payment_information" title={t('delivery_management_screen.payment_information')} showSwitch={false} />
          </div>
        </LoginRequired>
      </Box>
    </div>
  )
}

export default DeliveryManagementContainer
