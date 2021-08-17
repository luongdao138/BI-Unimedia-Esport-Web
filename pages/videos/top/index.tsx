import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import VideosTopContainer from '@containers/VideosTopContainer'

const VideosTopPage: PageWithLayoutType = () => {
  return (
    <StreamLayout minimizeLayout>
      <VideosTopContainer />
    </StreamLayout>
  )
}

export default VideosTopPage
