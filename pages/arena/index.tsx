import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { ArenaHomeContainer } from '@containers/arena'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { TournamentFilterOption } from '@services/arena.service'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'

import { useEffect, useState } from 'react'

const TournamentPage: PageWithLayoutType = () => {
  const router = useRouter()
  const filter = _.get(router, 'query.filter', '') as string
  const isAuth = useAppSelector(getIsAuthenticated)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (!isAuth && ['joined', 'organized'].includes(filter)) {
      router.push(ESRoutes.LOGIN)
    } else if (isAuth || (!isAuth && !['joined', 'organized'].includes(filter))) {
      setRender(true)
    }
  }, [isAuth, router.query])

  if (!render) {
    return <></>
  }
  return (
    <MainLayout loginRequired={false}>
      <ArenaHomeContainer filter={formatFilter(filter)} />
    </MainLayout>
  )
}

function formatFilter(filterText: string) {
  if (!_.isString(filterText)) return TournamentFilterOption.all
  const possibleFilters = ['all', 'ready', 'recruiting', 'before_start', 'in_progress', 'completed', 'joined', 'organized']
  if (possibleFilters.includes(filterText)) {
    return filterText as TournamentFilterOption
  }
  return TournamentFilterOption.all
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.arena_default_title'),
    },
  }
}

export default TournamentPage
