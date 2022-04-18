import MainLayout from '@layouts/MainLayout'
// import Events from '@containers/Events'
import Events from '@containers/Events/FreeStreamEvents'
import LiveThemeProvider from '@theme/live/LiveThemeProvider'
import { ESRoutes } from '@constants/route.constants'
import withAuth from '@utils/withAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface IProps {
  banners: string[]
}

export async function getStaticProps(): Promise<{
  props: {
    banners: string[]
  }
}> {
  // return {
  //   props: {
  //     banners: [
  //       '/images/events_banner_javcom.jpg',
  //       '/images/events_banner_javcom_slide2.png',
  //       '/images/events_banner_javcom_slide3.png',
  //       '/images/events_banner_javcom.jpg',
  //       '/images/events_banner_javcom.jpg',
  //     ],
  //   }, // will be passed to the page component as props
  // }
  return {
    props: {
      banners: [
        '/images/service_banner_1.png',
        '/images/service_banner_2.png',
        '/images/service_banner_3.png',
        '/images/service_banner_4.png',
        '/images/service_banner_5.png',
      ],
    }, // will be passed to the page component as props
  }
}

const EventsPage: React.FC<IProps> = (props) => {
  const router = useRouter()
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('backToTopVideo::direct::2')
    router.replace(ESRoutes.VIDEO_TOP)
  }, [])

  return (
    <MainLayout>
      <LiveThemeProvider>
        <Events banners={props.banners} />
      </LiveThemeProvider>
    </MainLayout>
  )
}

export default withAuth(EventsPage, ESRoutes.PR)
