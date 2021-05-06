import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React, { ReactElement } from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'

type Props = unknown

class Document extends NextDocument<Props> {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
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
