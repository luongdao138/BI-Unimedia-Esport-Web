import AccountSettingsChangeEmailContainer from '@containers/Settings/Account/ChangeEmail'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'

const AccountChangeEmailPage: PageWithLayoutType = () => {
  return <AccountSettingsChangeEmailContainer />
}

AccountChangeEmailPage.Layout = BlankLayout

export default AccountChangeEmailPage
