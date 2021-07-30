import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESBlockSettings from '@containers/UserSecuritySettings/BlockSettings'
import { withAuth } from '@utils/withAuth'

const BlockSettingsSettingsPage: PageWithLayoutType = () => {
  return <ESBlockSettings />
}

BlockSettingsSettingsPage.Layout = MainLayout

export default withAuth(BlockSettingsSettingsPage)
