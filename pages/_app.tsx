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

type Props = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
}

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

    if (store.getState().auth.user) {
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
  return (
    <PersistGate persistor={persistStore(store)} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme}>
        <ESLoader open={loader} />
        <SimpleReactLightbox>
          <Layout>
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </SimpleReactLightbox>
      </ThemeProvider>
    </PersistGate>
  )
}
export default storeWrapper.withRedux(App)
