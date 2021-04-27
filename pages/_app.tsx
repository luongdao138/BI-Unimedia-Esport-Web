import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { storeWrapper } from '@store/store'
import '@theme/globalcss/main.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return <Component {...pageProps} />
}
export default storeWrapper.withRedux(App)
