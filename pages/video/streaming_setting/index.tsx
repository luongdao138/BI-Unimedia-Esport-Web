import StreamLayout from '@layouts/StreamLayout'
import PageWithLayoutType from '@constants/page'
import StreamingSettingContainer from '@containers/StreamingSettingContainer'

const StreamingSettingPage: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <StreamingSettingContainer />
    </StreamLayout>
  )
}

export default StreamingSettingPage
