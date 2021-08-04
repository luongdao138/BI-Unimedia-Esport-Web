import PageWithLayoutType from '@constants/page'
import BlankLayout from '@layouts/BlankLayout'
import LobbyCreateContainer from '@containers/lobby/UpsertForm'
import React from 'react'

const LobbyCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout>
      <LobbyCreateContainer />
    </BlankLayout>
  )
}

export default LobbyCreatePage
