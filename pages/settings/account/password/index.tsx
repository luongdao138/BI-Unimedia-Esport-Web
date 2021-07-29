import AccountSettingsPasswordContainer from '@containers/Settings/Account/Password'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import useAuthenticated from '@utils/hooks/useAuthenticated'
import { withAuth } from '@utils/withAuth'

const AccountSettingsPasswordPage: PageWithLayoutType = () => {
  useAuthenticated()
  return <AccountSettingsPasswordContainer />
}

AccountSettingsPasswordPage.Layout = BlankLayout

export default withAuth(AccountSettingsPasswordPage)
