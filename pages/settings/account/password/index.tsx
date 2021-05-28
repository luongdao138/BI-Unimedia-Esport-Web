import AccountSettingsPasswordContainer from '@containers/Settings/Account/Password'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import useAuthenticated from './../useAuthenticated'

const AccountSettingsPasswordPage: PageWithLayoutType = () => {
  useAuthenticated()
  return <AccountSettingsPasswordContainer />
}

AccountSettingsPasswordPage.Layout = BlankLayout

export default AccountSettingsPasswordPage
