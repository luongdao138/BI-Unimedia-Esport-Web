import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { ArenaHomeContainer } from '@containers/arena'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { TournamentFilterOption } from '@services/arena.service'

const TournamentPage: PageWithLayoutType = () => {
  const router = useRouter()
  const filter = _.get(router, 'query.filter', '') as string

  return <ArenaHomeContainer filter={formatFilter(filter)} />
}

function formatFilter(filterText: string) {
  if (!_.isString(filterText)) return TournamentFilterOption.all
  const possibleFilters = ['all', 'ready', 'recruiting', 'before_start', 'in_progress', 'completed', 'joined', 'organized']
  if (possibleFilters.includes(filterText)) {
    return filterText as TournamentFilterOption
  }
  return TournamentFilterOption.all
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
