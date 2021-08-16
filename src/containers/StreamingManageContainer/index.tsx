import HeaderWithButton from '@components/HeaderWithButton'
import SettingsRowItem from '@components/SettingsRowItem'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'

const StreamingManageContainer: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('streaming_manage_screen.title')} />
      <Box>
        <LoginRequired>
          <div
            onClick={() => {
              router.push(ESRoutes.VIDEO_STREAMING_SETTING)
            }}
          >
            <SettingsRowItem key="delivery_settings" title={t('streaming_manage_screen.delivery_settings')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.VIDEO_STREAMING_SETTING)
            }}
          >
            <SettingsRowItem
              key="distribution_data_management"
              title={t('streaming_manage_screen.distribution_data_management')}
              showSwitch={false}
            />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.VIDEO_STREAMING_SETTING)
            }}
          >
            <SettingsRowItem key="archive_list" title={t('streaming_manage_screen.archive_list')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.VIDEO_STREAMING_SETTING)
            }}
          >
            <SettingsRowItem key="payment_information" title={t('streaming_manage_screen.payment_information')} showSwitch={false} />
          </div>
        </LoginRequired>
      </Box>
    </div>
  )
}

export default StreamingManageContainer
