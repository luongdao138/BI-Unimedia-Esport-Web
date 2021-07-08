import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import SettingsRowItem from '@components/SettingsRowItem'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const SecuritySettingsPage: PageWithLayoutType = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <MainLayout loginRequired>
      <div>
        <HeaderWithButton title={t('security_settings.title')} />
        <Box>
          <div
            onClick={() => {
              router.push(ESRoutes.MY_PAGE_SETTINGS)
            }}
          >
            <SettingsRowItem key="account_settings" title={t('security_settings.my_page')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.MESSAGE_SETTINGS)
            }}
          >
            <SettingsRowItem key="message" title={t('security_settings.message')} showSwitch={false} />
          </div>
          <div
            onClick={() => {
              router.push(ESRoutes.BLOCK_SETTINGS)
            }}
          >
            <SettingsRowItem key="block" title={t('security_settings.block')} showSwitch={false} />
          </div>
        </Box>
      </div>
    </MainLayout>
  )
}

export default SecuritySettingsPage
