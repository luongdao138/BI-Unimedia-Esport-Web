import HeaderWithButton from '@components/HeaderWithButton'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const ArchivedListContainer: React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('archived_list_screen.title')} />
      <Box>ArchivedListContainer</Box>
    </div>
  )
}

export default ArchivedListContainer
