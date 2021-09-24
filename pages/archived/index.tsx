import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import VideoLiveStreamContainer from '@containers/VideoLiveStreamContainer'

const VideoArchivedPage: PageWithLayoutType = () => {
  return (
    <StreamLayout minimizeLayout loginRequired={false}>
      <VideoLiveStreamContainer />
    </StreamLayout>
  )
}

export default VideoArchivedPage
