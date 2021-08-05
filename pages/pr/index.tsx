import MainLayout from '@layouts/MainLayout'
import Pr from '@containers/Pr/FreeStreamPr'
import LiveThemeProvider from '@theme/live/LiveThemeProvider'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { useEffect } from 'react'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import Header from '@components/HeaderWithButton'

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
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const { push } = useRouter()
  useEffect(() => {
    if (isAuthenticated) {
      push(ESRoutes.EVENTS)
    }
  }, [isAuthenticated])

  if (isAuthenticated) return <></>
  return (
    <MainLayout footer={false}>
      <Header title="動画" withBackButton={false} />
      <LiveThemeProvider>
        <Pr banners={props.banners} />
      </LiveThemeProvider>
    </MainLayout>
  )
}

export default PrPage
