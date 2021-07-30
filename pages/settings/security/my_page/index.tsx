import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESMyPageInfoSettings from '@containers/UserSecuritySettings/MyPageInfoSettings'
import { withAuth } from '@utils/withAuth'

const MyPageInfoSettingsSettingsPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <ESMyPageInfoSettings />
    </MainLayout>
  )
}

export default withAuth(MyPageInfoSettingsSettingsPage)
