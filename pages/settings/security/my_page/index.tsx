import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESMyPageInfoSettings from '@containers/UserSecuritySettings/MyPageInfoSettings'

const MyPageInfoSettingsSettingsPage: PageWithLayoutType = () => {
  return <ESMyPageInfoSettings />
}

MyPageInfoSettingsSettingsPage.Layout = MainLayout

export default MyPageInfoSettingsSettingsPage
