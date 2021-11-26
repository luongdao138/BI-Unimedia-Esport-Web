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
              router.push(ESRoutes.LIVE_STREAM_LIST)
            }}
          >
            <SettingsRowItem key="live_stream_list" title={t('streaming_manage_screen.live_stream_list')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.ARCHIVED_LIST)
            }}
          >
            <SettingsRowItem key="archived_list" title={t('streaming_manage_screen.archived_list')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.PAYMENT_INFO)
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
