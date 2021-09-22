import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import StreamingManageContainer from '@containers/StreamingManageContainer'

const StreamingManagePage: PageWithLayoutType = () => {
  return (
    <StreamLayout>
      <StreamingManageContainer />
    </StreamLayout>
  )
}

export default StreamingManagePage
