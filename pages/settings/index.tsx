import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import LoginRequired from '@containers/LoginRequired'
import ButtonPrimary from '@components/ButtonPrimary'

const SettingsPage: PageWithLayoutType = () => {
  return (
    <div>
      <LoginRequired>
        <ButtonPrimary
          round
          onClick={() => {
            alert('aaa')
          }}
        >
          保存する
        </ButtonPrimary>
      </LoginRequired>
    </div>
  )
}

SettingsPage.Layout = MainLayout

export default SettingsPage
