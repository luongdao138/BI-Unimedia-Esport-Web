import HeaderWithButton from '@components/HeaderWithButton'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const PaymentInfoContainer: React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('payment_information_screen.title')} />
      <Box>PaymentInfoContainer</Box>
    </div>
  )
}

export default PaymentInfoContainer
