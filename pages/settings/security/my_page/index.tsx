import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESMyPageInfoSettings from '@containers/UserSecuritySettings/MyPageInfoSettings'

const MyPageInfoSettingsSettingsPage: PageWithLayoutType = () => {
  return <ESMyPageInfoSettings />
}

MyPageInfoSettingsSettingsPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default MyPageInfoSettingsSettingsPage
