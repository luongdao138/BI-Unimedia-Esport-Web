import AccountSettingsChangeEmailContainer from '@containers/Settings/Account/ChangeEmail'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const AccountChangeEmailPage: PageWithLayoutType = () => {
  return (
    <BlankLayout>
      <AccountSettingsChangeEmailContainer />
    </BlankLayout>
  )
}

export default withAuth(AccountChangeEmailPage)
