import AccountSettingsChangePasswordContainer from '@containers/Settings/Account/ChangePassword'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const AccountChangePasswordPage: PageWithLayoutType = () => {
  useAuthenticated()
  return <AccountSettingsChangePasswordContainer />
}

AccountChangePasswordPage.Layout = BlankLayout

export default AccountChangePasswordPage
