import { useRouter } from 'next/router'
import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import PurchaseDetail from '@containers/PurchaseHistory/purchaseDetail'

const PurchaseHistoryDetail: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <MainLayout footer={false}>
      <PurchaseDetail id={String(id)} />
    </MainLayout>
  )
}
export default PurchaseHistoryDetail
