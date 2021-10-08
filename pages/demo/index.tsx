import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import { useMediaQuery, useTheme } from '@material-ui/core'
import VideoDetailDemo from '@containers/VideoLiveStreamContainerDemo'

const VideosTopPage: PageWithLayoutType = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <StreamLayout minimizeLayout loginRequired={false} footer={isMobile}>
      <VideoDetailDemo />
    </StreamLayout>
  )
}

export default VideosTopPage
