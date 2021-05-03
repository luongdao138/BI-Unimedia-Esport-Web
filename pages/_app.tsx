import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { storeWrapper } from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// import '@theme/globalcss/main.scss'

import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '@theme/index'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const store = useStore()
  return (
    <PersistGate persistor={persistStore(store)} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </PersistGate>
  )
}
export default storeWrapper.withRedux(App)
