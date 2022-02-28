import HomeContainer from '@containers/Home'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import i18n from '@locales/i18n'
import GoogleAd from '@components/GoogleAd'
const HomePage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired>
      <GoogleAd id="ad_home_t" slot="" classNames="ad_home_t" />
      <HomeContainer />
    </MainLayout>
  )
}

export async function getStaticProps(): Promise<{
  props: {
    title: string
  }
}> {
  return {
    props: {
      title: i18n.t('common:page_head.home_title'),
    },
  }
}

export default HomePage
