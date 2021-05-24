import AccountSettingsContainer from '@containers/Settings/AccountSettings'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const AccountSettingsPage: PageWithLayoutType = () => {
  return <AccountSettingsContainer />
}

AccountSettingsPage.Layout = MainLayout

export default AccountSettingsPage
