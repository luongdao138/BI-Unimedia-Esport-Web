import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { ArenaHomeContainer } from '@containers/arena'
import i18n from '@locales/i18n'
const TournamentPage: PageWithLayoutType = () => {
  return <ArenaHomeContainer />
}

TournamentPage.Layout = MainLayout

export async function getStaticProps(): Promise<{
  props: {
    title: string
  }
}> {
  return {
    props: {
      title: i18n.t('common:page_head.arena_default_title'),
    },
  }
}

export default TournamentPage
