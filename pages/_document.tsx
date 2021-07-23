import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React, { ReactElement } from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'

type Props = unknown
class Document extends NextDocument<Props> {
  render(): ReactElement {
    const GA_TRACKING_ID = process.env.GA_TRACKING_ID
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
          <link rel="manifest" href="/manifest.json" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
          <link href="/fonts/fontawesome-free-5.15.3-web/css/all.css" rel="stylesheet"></link>

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await NextDocument.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  }
}

export default Document
