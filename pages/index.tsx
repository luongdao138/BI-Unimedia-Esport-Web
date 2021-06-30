import TopContainer from '@containers/Top'
import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import i18n from '@locales/i18n'
const TopPage: PageWithLayoutType = () => {
  return <TopContainer />
}

TopPage.Layout = PlainLayout

export async function getStaticProps(): Promise<{
  props: {
    title: string
  }
}> {
  return {
    props: {
      title: i18n.t('common:page_head.home_top'),
    },
  }
}

export default TopPage
