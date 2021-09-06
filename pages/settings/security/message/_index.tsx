import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESMessageSettings from '@containers/UserSecuritySettings/MessageSettings'

const MessageSettingsSettingsPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <ESMessageSettings />
    </MainLayout>
  )
}

export default MessageSettingsSettingsPage
