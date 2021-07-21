import AccountSettingsConfirmContainer from '@containers/Settings/Account/Confirm'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const AccountChangeEmailConfirmPage: PageWithLayoutType = () => {
  useAuthenticated()
  return <AccountSettingsConfirmContainer />
}

AccountChangeEmailConfirmPage.Layout = BlankLayout

export default AccountChangeEmailConfirmPage
