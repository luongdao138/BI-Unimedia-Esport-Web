import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import ArenaCreateContainer from '@containers/arena/UpsertForm'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
const ArenaCreatePage: PageWithLayoutType = () => {
  return <ArenaCreateContainer />
}

ArenaCreatePage.Layout = BlankLayout

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.arena_default_title'),
    },
  }
}

export default ArenaCreatePage
