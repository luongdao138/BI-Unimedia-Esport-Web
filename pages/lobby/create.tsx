import PageWithLayoutType from '@constants/page'
import BlankLayout from '@layouts/BlankLayout'
import LobbyCreateContainer from '@containers/Lobby/UpsertForm'
import React from 'react'
import { GetStaticProps } from 'next'
import i18n from '@locales/i18n'

const LobbyCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout>
      <LobbyCreateContainer />
    </BlankLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: i18n.t('common:page_head.lobby_default_title'),
    },
  }
}

export default LobbyCreatePage
