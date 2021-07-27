import PlainLayout from '@layouts/PlainLayout'
import Events from '@containers/Events'

interface IProps {
  banners: string[]
}

export async function getServerSideProps(): Promise<{
  props: {
    banners: string[]
  }
}> {
  return {
    props: {
      banners: [
        '/images/events_banner_javcom.jpg',
        '/images/events_banner_javcom_slide2.png',
        '/images/events_banner_javcom_slide3.png',
        '/images/events_banner_javcom.jpg',
        '/images/events_banner_javcom.jpg',
      ],
    }, // will be passed to the page component as props
  }
}

const EventsPage: React.FC<IProps> = (props) => {
  return (
    <PlainLayout>
      <Events banners={props.banners} />
    </PlainLayout>
  )
}

export default EventsPage
