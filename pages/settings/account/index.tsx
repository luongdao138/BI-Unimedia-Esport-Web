import AccountSettingsContainer from '@containers/Settings/Account'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import useAuthenticated from './useAuthenticated'

const AccountSettingsPage: PageWithLayoutType = () => {
  useAuthenticated()
  return <AccountSettingsContainer />
}

AccountSettingsPage.Layout = MainLayout

export default AccountSettingsPage
