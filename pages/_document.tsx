import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React, { ReactElement } from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'

type Props = unknown
class Document extends NextDocument<Props> {
  render(): ReactElement {
    const GA_TRACKING_ID = process.env.GA_TRACKING_ID
    const GTM_ID = process.env.GTM_ID
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" key="shortcutIcon" />
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
            
              gtag('config', '${GA_TRACKING_ID}');
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
          `,
            }}
          />
          {/* <script src="https://player.live-video.net/1.4.0/amazon-ivs-player.min.js"></script> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src=""https://www.googletagmanager.com/ns.html?id=${GTM_ID}""
height=""0"" width=""0"" style=""display:none;visibility:hidden""></iframe>`,
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
