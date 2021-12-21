import React from 'react'
import Head from 'next/head'
import i18n from '@locales/i18n'
import { useTranslation } from 'react-i18next'
interface HeadProps {
  title: string
  desc?: string
  keywords?: string
  image?: string
}
const ESHead: React.FC<HeadProps> = ({ title, desc, keywords, image }) => {
  const { t } = useTranslation()
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <meta charSet="utf-8" />
      <meta name="description" content={desc || t('common:page_head.default_desc')} />
      <meta name="keywords" content={keywords || t('common:page_head.default_keywords')} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="eXeLAB" />
      <meta property="og:locale" content="ja_JP" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@eXeLAB_official" />
      <meta property="og:url" content={typeof window !== 'undefined' && window.location.toString()} />
      {image && <meta property="twitter:image" content={image} />}
    </Head>
  )
}
ESHead.defaultProps = {
  desc: i18n.t('common:page_head.default_desc'),
  keywords: i18n.t('common:page_head.default_keywords'),
}
export default ESHead
