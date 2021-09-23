import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { StoreType, storeWrapper } from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import '@theme/globalcss/main.scss'
import '@theme/globalcss/font.scss'
import { authorizationProvider } from '@services/interceptor'
import ESLoader from '@components/FullScreenLoader'
import { useRouter } from 'next/router'
import useNgWords from '@utils/hooks/useNgWords'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import userProfile from '@store/userProfile'
import theme from '@theme/index'
import PageWithLayoutType from '@constants/page'
import { WEBSOCKET_PREFIX } from '@constants/socket.constants'
import { WEBSYNC_PREFIX } from '@constants/sync.constants'
import 'src/locales/i18n'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import '/src/components/LiveSlider/pagination.scss'
import SimpleReactLightbox from 'simple-react-lightbox'
import useRouteUrlHistory from '@utils/hooks/useRouterUrlHistory'
import ToastContainer from '@containers/ToastContainer'
import DialogContainer from '@containers/DialogContainer'
import ESHead from '@components/ESHead'
import { ConfirmProvider } from '@components/Confirm'
import { defaultConfirmationOptions } from '@constants/common.constants'
import 'video.js/src/css/video-js.scss'
import 'src/containers/VideoPlayer/theme.scss'
import 'src/containers/VideoPlayer/position.scss'
import 'src/containers/VideoPlayer/customPlugins/plugin.scss'
import 'src/theme/globalcss/layout.scss'
import Script from 'react-load-script'
import Amplify from 'aws-amplify'

const AWS_PROJECT_REGION = process.env.NEXT_PUBLIC_AWS_PROJECT_REGION
const AWS_APPSYNC_GRAPHQLENDPOINT = process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT
const AWS_APPSYNC_REGION = process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION
const AWS_APPSYNC_AUTHENTICATIONTYPE = process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATIONTYPE
const AWS_APPSYNC_APIKEY = process.env.NEXT_PUBLIC_AWS_APPSYNC_APIKEY

Amplify.configure({
  ...{
    aws_project_region: AWS_PROJECT_REGION,
    aws_appsync_graphqlEndpoint: AWS_APPSYNC_GRAPHQLENDPOINT,
    aws_appsync_region: AWS_APPSYNC_REGION,
    aws_appsync_authenticationType: AWS_APPSYNC_AUTHENTICATIONTYPE,
    aws_appsync_apiKey: AWS_APPSYNC_APIKEY,
  },
  ssr: true,
})

type Props = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
}

type previousRouteProps = {
  previousRoute: string
}

export const RouteContext = React.createContext<previousRouteProps>({ previousRoute: '' })

const App = ({ Component, pageProps }: Props) => {
  const [loader, setLoader] = React.useState(false)
  const router = useRouter()
  const store: StoreType = useStore()
  const accessToken = store.getState().auth.user?.accessToken
  authorizationProvider(store)
  useNgWords(store)
  useEffect(() => {
    store.dispatch({
      type: `${WEBSOCKET_PREFIX}:CONNECT`,
    })
    store.dispatch({
      type: `${WEBSYNC_PREFIX}:CONNECT`,
    })
  }, [accessToken])

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

    if (store.getState().auth.user?.accessToken) {
      store.dispatch(userProfile.actions.getUserProfile())
    }

    const handleRouteChange = () => {
      setLoader(false)
    }
    router.events.on('routeChangeStart', (_) => setLoader(true))
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  const Layout = Component.Layout ?? React.Fragment

  const { previousRoute } = useRouteUrlHistory()
  const handleLoadScript = () => {
    // console.warn('IVSPlayer; ', window?.IVSPlayer)
  }
  return (
    <>
      <ESHead title={pageProps.title || 'eXeLAB'} desc={pageProps.desc} keywords={pageProps.keywords} image={pageProps.image} />
      <Script url="https://player.live-video.net/1.4.0/amazon-ivs-player.min.js" onError={console.error} onLoad={handleLoadScript} />
      <PersistGate persistor={persistStore(store)}>
        <RouteContext.Provider
          value={{
            previousRoute,
          }}
        >
          <ThemeProvider theme={theme}>
            <ESLoader open={loader} />
            <ToastContainer />
            <DialogContainer />
            <SimpleReactLightbox>
              <ConfirmProvider defaultOptions={defaultConfirmationOptions}>
                <Layout>
                  <CssBaseline />
                  <Component {...pageProps} />
                </Layout>
              </ConfirmProvider>
            </SimpleReactLightbox>
          </ThemeProvider>
        </RouteContext.Provider>
      </PersistGate>
    </>
  )
}
export default storeWrapper.withRedux(App)
