import MainLayout from '@layouts/MainLayout'
// import Events from '@containers/Events'
import Events from '@containers/Events/FreeStreamEvents'
import LiveThemeProvider from '@theme/live/LiveThemeProvider'

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
  return (
    <MainLayout footer={false}>
      <LiveThemeProvider>
        <Events banners={props.banners} />
      </LiveThemeProvider>
    </MainLayout>
  )
}

export default EventsPage
