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
    <div>
      <HeaderWithButton title={t('service_info.title')} />
      <Box>
        <div>
          <SettingsRowItem key="enterprise_info" showLink title={t('service_info.enterprise_info')} showSwitch={false} />
        </div>
        <div>
          <SettingsRowItem key="faq" showLink title={t('service_info.faq')} showSwitch={false} />
        </div>
        <div
          onClick={() => {
            router.push(ESRoutes.INQUIRY_SETTINGS)
          }}
        >
          <SettingsRowItem key="inquiry" title={t('service_info.inquiry')} showSwitch={false} />
        </div>
      </Box>
    </div>
  )
}

SecuritySettingsPage.Layout = MainLayout

export default SecuritySettingsPage
