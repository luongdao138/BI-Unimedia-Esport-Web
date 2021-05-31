import AccountSettingsChangePasswordContainer from '@containers/Settings/Account/ChangePassword'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'

const AccountChangePasswordPage: PageWithLayoutType = () => {
  return <AccountSettingsChangePasswordContainer />
}

AccountChangePasswordPage.Layout = BlankLayout

export default AccountChangePasswordPage
