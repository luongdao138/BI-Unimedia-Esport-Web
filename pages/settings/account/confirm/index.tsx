import AccountSettingsConfirmContainer from '@containers/Settings/Account/Confirm'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'

const AccountChangeEmailConfirmPage: PageWithLayoutType = () => {
  return <AccountSettingsConfirmContainer />
}

AccountChangeEmailConfirmPage.Layout = BlankLayout

export default AccountChangeEmailConfirmPage
