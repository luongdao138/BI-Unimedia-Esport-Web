import NotificationContainer from '@containers/Notifications'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const NotificationsPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired>
      <NotificationContainer />
    </MainLayout>
  )
}

export default NotificationsPage
