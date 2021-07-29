import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import PurchaseDetail from '@containers/PurchaseHistory/purchaseDetail'

const PurchaseHistoryDetail: PageWithLayoutType = () => {
  return (
    <MainLayout footer={false} loginRequired={true}>
      <PurchaseDetail />
    </MainLayout>
  )
}
export default PurchaseHistoryDetail
