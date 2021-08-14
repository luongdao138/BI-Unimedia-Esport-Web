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
import SimpleReactLightbox from 'simple-react-lightbox'
import useRouteUrlHistory from '@utils/hooks/useRouterUrlHistory'
import ToastContainer from '@containers/ToastContainer'
import DialogContainer from '@containers/DialogContainer'
import ESHead from '@components/ESHead'
import useClearCookies from '@utils/hooks/useClearCookies'
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
  useClearCookies()
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

  return (
    <>
      <ESHead title={pageProps.title || 'eXeLAB'} desc={pageProps.desc} keywords={pageProps.keywords} image={pageProps.image} />
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
              <Layout>
                <CssBaseline />
                <Component {...pageProps} />
              </Layout>
            </SimpleReactLightbox>
          </ThemeProvider>
        </RouteContext.Provider>
      </PersistGate>
    </>
  )
}
export default storeWrapper.withRedux(App)
