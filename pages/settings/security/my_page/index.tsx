import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESMyPageInfoSettings from '@containers/UserSecuritySettings/MyPageInfoSettings'

const MyPageInfoSettingsSettingsPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <ESMyPageInfoSettings />
    </MainLayout>
  )
}

export default MyPageInfoSettingsSettingsPage
