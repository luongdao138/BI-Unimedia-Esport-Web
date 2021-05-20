import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESBlockSettings from '@containers/UserSecuritySettings/BlockSettings'

const BlockSettingsSettingsPage: PageWithLayoutType = () => {
  return <ESBlockSettings />
}

BlockSettingsSettingsPage.Layout = MainLayout

export default BlockSettingsSettingsPage
