import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import LiveStreamListContainer from '@containers/LiveStreamListContainer'

const LiveStreamListPage: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <LiveStreamListContainer />
    </StreamLayout>
  )
}

export default LiveStreamListPage
