import PlainLayout from '@layouts/PlainLayout'
import Pr from '@containers/Pr/FreeStreamPr'

interface IProps {
  banners: string[]
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps() {
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
