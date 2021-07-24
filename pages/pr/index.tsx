import PlainLayout from '@layouts/PlainLayout'
import Pr from '@containers/Pr/index'

interface IProps {
  banners: string[]
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getServerSideProps() {
  return {
    props: {
      banners: [
        '/images/events_banner_javcom.jpg',
        '/images/events_banner_javcom_slide2.png',
        '/images/events_banner_javcom_slide3.png',
        '/images/events_banner_javcom.jpg',
        '/images/events_banner_javcom.jpg',
      ],
    },
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrPage = (props: IProps) => {
  return (
    <>
      <PlainLayout>
        <Pr banners={props.banners} />
      </PlainLayout>
    </>
  )
}

export default PrPage
