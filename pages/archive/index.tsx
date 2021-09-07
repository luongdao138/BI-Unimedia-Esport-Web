/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import MainLayout from '@layouts/MainLayout'
import { prServices } from '@services/pr.services'
import LiveThemeProvider from '@theme/live/LiveThemeProvider'
import withAuth from '@utils/withAuth'
import ArchiveContainer from '@containers/ArchiveContainer'
import { ESRoutes } from '@constants/route.constants'

interface ArchivePageProps {
  props: {
    title?: string
    desc?: string
  }
}

const ArchivePage: React.FC<ArchivePageProps> = () => {
  return (
    <MainLayout>
      <LiveThemeProvider>
        <ArchiveContainer />
      </LiveThemeProvider>
    </MainLayout>
  )
}

export async function getStaticProps(): Promise<ArchivePageProps> {
  try {
    const {
      data: { data },
    } = await prServices.getTop()
    return {
      props: {
        title: 'NTTe-Sports動画配信',
        desc: data.attributes.description,
      },
    }
  } catch (error) {
    return { props: {} }
  }
}

export default withAuth(ArchivePage, ESRoutes.PR)
