import AccountSettingsPasswordContainer from '@containers/Settings/AccountSettings/Password'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'

const AccountSettingsPasswordPage: PageWithLayoutType = () => {
  return <AccountSettingsPasswordContainer />
}

AccountSettingsPasswordPage.Layout = BlankLayout

export default AccountSettingsPasswordPage
