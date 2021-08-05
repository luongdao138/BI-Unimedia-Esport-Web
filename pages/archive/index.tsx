/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import MainLayout from '@layouts/MainLayout'
import { prServices } from '@services/pr.services'
import LiveThemeProvider from '@theme/live/LiveThemeProvider'
import withAuth from '@utils/withAuth'
import ArchiveContainer from '@containers/ArchiveContainer'

const ArchivePage = () => {
  return (
    <MainLayout>
      <LiveThemeProvider>
        <ArchiveContainer />
      </LiveThemeProvider>
    </MainLayout>
  )
}

export async function getStaticProps() {
  try {
    const {
      data: { data },
    } = await prServices.getTop()
    return {
      props: {
        title: 'NTTe-Sports動画配信',
        description: data.attributes.description,
      },
    }
  } catch (error) {
    return { props: {} }
  }
}

export default withAuth(ArchivePage)
