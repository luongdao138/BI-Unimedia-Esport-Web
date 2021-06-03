import AccountSettingsContainer from '@containers/Settings/Account'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const AccountSettingsPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired>
      <AccountSettingsContainer />
    </MainLayout>
  )
}

export default AccountSettingsPage
