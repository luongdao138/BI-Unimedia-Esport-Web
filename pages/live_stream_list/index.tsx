import PageWithLayoutType from '@constants/page'
import LiveStreamListContainer from '@containers/LiveStreamListContainer'
import StreamerRequireLayout from '@layouts/StreamerRequireLayout'

const LiveStreamListPage: PageWithLayoutType = () => {
  return (
    <StreamerRequireLayout>
      <LiveStreamListContainer />
    </StreamerRequireLayout>
  )
}

export default LiveStreamListPage
