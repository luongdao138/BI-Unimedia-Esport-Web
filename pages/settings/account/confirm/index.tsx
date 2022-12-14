import AccountSettingsConfirmContainer from '@containers/Settings/Account/Confirm'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const AccountChangeEmailConfirmPage: PageWithLayoutType = () => {
  return (
    <BlankLayout>
      <AccountSettingsConfirmContainer />
    </BlankLayout>
  )
}

export default withAuth(AccountChangeEmailConfirmPage)
