import NotificationContainer from '@containers/Notifications'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const NotificationsPage: PageWithLayoutType = () => {
  return (
    <MainLayout footer={false}>
      <NotificationContainer />
    </MainLayout>
  )
}

export default NotificationsPage
