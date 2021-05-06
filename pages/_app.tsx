import React, { FC, useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { storeWrapper } from '@store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// import '@theme/globalcss/main.scss'

import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '@theme/index'
import 'src/locales/i18n'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    const node = loadCSS('https://use.fontawesome.com/releases/v5.12.0/css/all.css', document.querySelector('#font-awesome-css'))

    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

    return () => {
      node.parentNode?.removeChild(node)
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
