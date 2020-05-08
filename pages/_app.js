import Head from 'next/head'

import '../styles/base.css'

function MyApp({ Component, pageProps }) {
  const og = pageProps.data?.og
  const title = pageProps.data?.title

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:title" content={title || `Telmo, code & design`} />
        <meta property="og:site_name" content="Telmo, code & design" />
        <meta property="og:description" content={og ? og.description : `Writing about the tips I usually share on Twitter and some more.`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@telmo" />
        <meta property="og:image" content={og ? og.image : `https://telmo.im/og/default.png`} />

        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

        <title>{title || `Telmo, code & design`}</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
