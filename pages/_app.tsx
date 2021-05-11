import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { storeWrapper } from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import '@theme/globalcss/main.scss'
import { authorizationProvider } from '@services/interceptor'
import ESLoader from '@components/FullScreenLoader'
import { useRouter } from 'next/router'
import useNgWords from '@utils/hooks/useNgWords'

import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '@theme/index'
import 'src/locales/i18n'

const App: FC<AppProps> = ({ Component, pageProps }: any) => {
  const [loader, setLoader] = React.useState(false)
  const router = useRouter()
  const store = useStore()
  authorizationProvider(store)
  useNgWords(store)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
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

  const Layout = Component.Layout ? Component.Layout : React.Fragment
  return (
    <PersistGate persistor={persistStore(store)} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme}>
        <ESLoader open={loader} />
        <Layout>
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PersistGate>
  )
}
export default storeWrapper.withRedux(App)
