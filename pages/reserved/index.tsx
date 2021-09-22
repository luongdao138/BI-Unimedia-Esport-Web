import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import VideoLiveStreamContainer from '@containers/VideoLiveStreamContainer'

const VideoReservedPage: PageWithLayoutType = () => {
  return (
    <StreamLayout minimizeLayout>
      <VideoLiveStreamContainer />
    </StreamLayout>
  )
}

export default VideoReservedPage
