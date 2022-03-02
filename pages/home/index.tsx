import HomeContainer from '@containers/Home'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import i18n from '@locales/i18n'

const HomePage: PageWithLayoutType = () => {
  // const theme = useTheme()
  // const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  // const androidPl = /Android/i.test(window.navigator.userAgent)
  // const iPhonePl = /iPhone/i.test(window.navigator.userAgent)
  // const isSmartPhone = screenDownSP || androidPl || iPhonePl
  return (
    <MainLayout loginRequired>
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
