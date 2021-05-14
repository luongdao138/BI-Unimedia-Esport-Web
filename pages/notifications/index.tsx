import NotificationContainer from '@containers/Notifications'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const NotificationsPage: PageWithLayoutType = () => {
  return <NotificationContainer />
}

NotificationsPage.Layout = MainLayout

export default NotificationsPage
