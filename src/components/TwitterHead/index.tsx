import React from 'react'
import Head from 'next/head'

interface HeadProps {
  title: string
  image?: string
}
const TwitterHead: React.FC<HeadProps> = ({ title, image }) => {
  return (
    <Head>
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content={window.location.toString()} />
      <meta property="og:title" content={title} />
      <meta property="twitter:image" content={image} />
    </Head>
  )
}

export default TwitterHead
