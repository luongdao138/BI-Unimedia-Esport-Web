import { useRouter } from 'next/router'
import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import NotificationDetail from '@containers/Notifications/notificationDetail'

const NotificaionDetail: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <MainLayout footer={false}>
      <NotificationDetail id={id} />
    </MainLayout>
  )
}
export default NotificaionDetail
