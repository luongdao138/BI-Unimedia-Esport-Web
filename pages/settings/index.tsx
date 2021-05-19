import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import LoginRequired from '@containers/LoginRequired'
import ButtonPrimary from '@components/ButtonPrimary'
import Link from 'next/link'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'

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
      <Box>
        <LoginRequired>
          <Link href={ESRoutes.USER_SECURITY_SETTINGS}>User Security Settings</Link>
        </LoginRequired>
      </Box>
    </div>
  )
}

SettingsPage.Layout = MainLayout

export default SettingsPage
