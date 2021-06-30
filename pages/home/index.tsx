import HomeContainer from '@containers/Home'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESHead from '@components/ESHead'
import { useTranslation } from 'react-i18next'
const HomePage: PageWithLayoutType = () => {
  const { t } = useTranslation(['common'])
  return (
    <MainLayout loginRequired>
      <ESHead title={t('common:page_head.home_title')} />
      <HomeContainer />
    </MainLayout>
  )
}

export default HomePage
