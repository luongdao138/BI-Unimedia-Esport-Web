import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESMessageSettings from '@containers/UserSecuritySettings/MessageSettings'
import { withAuth } from '@utils/withAuth'

const MessageSettingsSettingsPage: PageWithLayoutType = () => {
  return <ESMessageSettings />
}

MessageSettingsSettingsPage.Layout = MainLayout

export default withAuth(MessageSettingsSettingsPage)
