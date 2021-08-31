import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import SettingsRowItem from '@components/SettingsRowItem'
import { ESRoutes } from '@constants/route.constants'
import { Box, Link } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const SecuritySettingsPage: PageWithLayoutType = () => {
  const { t } = useTranslation('common')
  return (
    <MainLayout loginRequired={false}>
      <div>
        <HeaderWithButton title={t('service_info.title')} />
        <Box>
          <Link href="https://www.ntte-sports.co.jp" underline={'none'} target="_blank">
            <SettingsRowItem key="enterprise_info" showLink title={t('service_info.enterprise_info')} showSwitch={false} />
          </Link>
          <Link href="https://support.exelab.jp/hc/ja" underline={'none'} target="_blank">
            <SettingsRowItem key="faq" showLink title={t('service_info.faq')} showSwitch={false} />
          </Link>
          <Link href={ESRoutes.INQUIRY_SETTINGS} underline={'none'}>
            <SettingsRowItem key="inquiry" title={t('service_info.inquiry')} showSwitch={false} />
          </Link>
        </Box>
      </div>
    </MainLayout>
  )
}

export default SecuritySettingsPage
