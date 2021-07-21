import AccountSettingsChangeEmailContainer from '@containers/Settings/Account/ChangeEmail'
import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const AccountChangeEmailPage: PageWithLayoutType = () => {
  useAuthenticated()
  return <AccountSettingsChangeEmailContainer />
}

AccountChangeEmailPage.Layout = BlankLayout

export default AccountChangeEmailPage
