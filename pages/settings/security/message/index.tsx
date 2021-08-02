import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESMessageSettings from '@containers/UserSecuritySettings/MessageSettings'

const MessageSettingsSettingsPage: PageWithLayoutType = () => {
  return <ESMessageSettings />
}

MessageSettingsSettingsPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default MessageSettingsSettingsPage
