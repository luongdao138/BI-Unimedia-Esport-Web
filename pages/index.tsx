import TopContainer from '@containers/Top'
import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import i18n from '@locales/i18n'
import { useRouter } from 'next/router'
import StreamLayout from '@layouts/StreamLayout'
import VideoLiveStreamContainer from '@containers/VideoLiveStreamContainer'

const TopPage: PageWithLayoutType = () => {
  const router = useRouter()
  // https://github.com/vercel/next.js/discussions/11484#discussioncomment-60563
  const queryKey = 'vid'
  const video_id = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
  return (
    <PlainLayout
    // noFooter={!!video_id}
    >
      {!video_id ? (
        <TopContainer />
      ) : (
        <StreamLayout noTopPadding minimizeLayout loginRequired={false} footer={false}>
          <VideoLiveStreamContainer />
        </StreamLayout>
      )}
    </PlainLayout>
  )
}

export async function getStaticProps(): Promise<{
  props: {
    title: string
  }
}> {
  return {
    props: {
      title: i18n.t('common:page_head.home_top'),
    },
  }
}

export default TopPage
