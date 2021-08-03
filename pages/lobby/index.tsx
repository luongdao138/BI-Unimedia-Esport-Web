import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import { LobbyHomeContainer } from '@containers/lobby'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { TournamentFilterOption } from '@services/arena.service'

const LobbyPage: PageWithLayoutType = () => {
  const router = useRouter()
  const filter = _.get(router, 'query.filter', '') as string
  return (
    <MainLayout>
      <LobbyHomeContainer filter={formatFilter(filter)} />
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

export default LobbyPage
