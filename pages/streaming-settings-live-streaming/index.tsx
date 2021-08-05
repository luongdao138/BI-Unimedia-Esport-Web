import StreamLayout from '@layouts/StreamLayout'
import PageWithLayoutType from '@constants/page'
import StreamingSettingsLiveStreaming from '@containers/StreamingSettingsLiveStreaming'

const StreamingSettings: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <StreamingSettingsLiveStreaming />
    </StreamLayout>
  )
}

export default StreamingSettings
