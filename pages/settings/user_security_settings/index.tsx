import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import SettingsRowItem from '@components/SettingsRowItem'

const UserSecuritySettingsPage: PageWithLayoutType = () => {
  return (
    <div>
      <SettingsRowItem title="大会履歴" />
      <SettingsRowItem title="アクティビティ" />
      <SettingsRowItem title="プロフィール" />
    </div>
  )
}

UserSecuritySettingsPage.Layout = MainLayout

export default UserSecuritySettingsPage
