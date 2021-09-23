import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import VideoLiveStreamContainer from '@containers/VideoLiveStreamContainer'

const VideoLiveStreamPage: PageWithLayoutType = () => {
  return (
    <StreamLayout minimizeLayout loginRequired={false}>
      <VideoLiveStreamContainer />
    </StreamLayout>
  )
}

export default VideoLiveStreamPage
