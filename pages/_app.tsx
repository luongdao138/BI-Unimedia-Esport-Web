import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { StoreType, storeWrapper } from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import '@theme/globalcss/main.scss'
import { authorizationProvider } from '@services/interceptor'
// import '@theme/globalcss/main.scss'

import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import userProfile from '@store/userProfile'
import theme from '@theme/index'
import 'src/locales/i18n'

const App: FC<AppProps> = ({ Component, pageProps }: any) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const Layout = Component.Layout ? Component.Layout : React.Fragment

  const store: StoreType = useStore()
  authorizationProvider(store)
  useEffect(() => {
    if (store.getState().auth.user) {
      store.dispatch(userProfile.actions.getUserProfile())
    }
  }, [])
  return (
    <PersistGate persistor={persistStore(store)} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme}>
        <Layout>
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PersistGate>
  )
}
export default storeWrapper.withRedux(App)
