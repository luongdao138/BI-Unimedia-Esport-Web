import HeaderWithButton from '@components/HeaderWithButton'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const LiveStreamListContainer: React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('live_stream_list_screen.title')} />
      <Box>LiveStreamList</Box>
    </div>
  )
}

export default LiveStreamListContainer
