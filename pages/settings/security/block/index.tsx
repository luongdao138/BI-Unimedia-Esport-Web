import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESBlockSettings from '@containers/UserSecuritySettings/BlockSettings'
import { withAuth } from '@utils/withAuth'

const BlockSettingsSettingsPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <ESBlockSettings />
    </MainLayout>
  )
}

export default withAuth(BlockSettingsSettingsPage)
