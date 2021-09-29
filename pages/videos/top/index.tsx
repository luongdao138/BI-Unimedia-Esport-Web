import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import VideosTopContainer from '@containers/VideosTopContainer'
import { useMediaQuery, useTheme } from '@material-ui/core'

const VideosTopPage: PageWithLayoutType = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <StreamLayout minimizeLayout loginRequired={false} footer={isMobile}>
      <VideosTopContainer />
    </StreamLayout>
  )
}

export default VideosTopPage
