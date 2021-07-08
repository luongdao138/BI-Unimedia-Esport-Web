import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { ArenaHomeContainer } from '@containers/arena'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
const TournamentPage: PageWithLayoutType = () => {
  return <ArenaHomeContainer />
}

TournamentPage.Layout = MainLayout

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.arena_default_title'),
    },
  }
}

export default TournamentPage
