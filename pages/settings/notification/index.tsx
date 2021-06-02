import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESNotificationSettings from '@containers/UserNotificationSettings'

const NotificationSettingsPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired>
      <ESNotificationSettings />
    </MainLayout>
  )
}

export default NotificationSettingsPage
