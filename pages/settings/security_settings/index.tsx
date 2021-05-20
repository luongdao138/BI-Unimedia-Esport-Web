import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import SecuritySettings from '@containers/SecuritySettings'

const SecuritySettingsPage: PageWithLayoutType = () => {
  return <SecuritySettings />
}

SecuritySettingsPage.Layout = MainLayout

export default SecuritySettingsPage
