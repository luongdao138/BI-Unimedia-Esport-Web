import React from 'react'
import MainLayout from '@layouts/MainLayout'
import withAuth from '@utils/withAuth'
import LiveThemeProvider from '@theme/live/LiveThemeProvider'
import StreamContainer from '@containers/StreamContainer'
import { prServices } from '@services/pr.services'

const StreamPage: React.FC = () => {
  return (
    <MainLayout footer={false}>
      <LiveThemeProvider>
        <StreamContainer />
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
        title: data.attributes.title_static,
        desc: data.attributes.description,
      },
    }
  } catch (error) {
    return { props: {} }
  }
}

export default withAuth(StreamPage)
