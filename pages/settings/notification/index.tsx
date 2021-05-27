import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESNotificationSettings from '@containers/UserNotificationSettings'

const NotificationSettingsPage: PageWithLayoutType = () => {
  return <ESNotificationSettings />
}

NotificationSettingsPage.Layout = MainLayout

export default NotificationSettingsPage
