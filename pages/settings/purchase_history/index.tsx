import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import ESPurchaseHistory from '@containers/PurchaseHistory'

const PurchaseHistoryPage: PageWithLayoutType = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('purchase_history.title')} />
      <ESPurchaseHistory />
    </div>
  )
}

PurchaseHistoryPage.Layout = MainLayout

export default PurchaseHistoryPage
