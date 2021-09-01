import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'
import React from 'react'
import { LobbyHomeContainer } from '@containers/Lobby'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { LobbyFilterOption } from '@services/lobby.service'

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
  if (!_.isString(filterText)) return LobbyFilterOption.all
  const possibleFilters = ['all', 'suggested', 'recruiting', 'joined', 'organized']
  if (possibleFilters.includes(filterText)) {
    return filterText as LobbyFilterOption
  }
  return LobbyFilterOption.all
}

export default LobbyPage
