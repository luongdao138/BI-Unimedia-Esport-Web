import AccountSettingsChangePasswordContainer from '@containers/Settings/Account/ChangePassword'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const AccountChangePasswordPage: PageWithLayoutType = () => {
  return <AccountSettingsChangePasswordContainer />
}

AccountChangePasswordPage.Layout = BlankLayout

export default withAuth(AccountChangePasswordPage)
