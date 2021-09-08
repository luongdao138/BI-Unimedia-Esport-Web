import AccountSettingsPasswordContainer from '@containers/Settings/Account/Password'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const AccountSettingsPasswordPage: PageWithLayoutType = () => {
  return (
    <BlankLayout>
      <AccountSettingsPasswordContainer />
    </BlankLayout>
  )
}

export default withAuth(AccountSettingsPasswordPage)
