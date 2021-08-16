import StreamLayout from '@layouts/StreamLayout'
import PageWithLayoutType from '@constants/page'
import StreamingSettingContainer from '@containers/StreamingSettingContainer'
import { useRouter } from 'next/router'

const StreamingSettingPage: PageWithLayoutType = () => {
  const router = useRouter()
  const default_tab = router?.query?.default_tab || 0
  
  return (
    <StreamLayout>
      <StreamingSettingContainer default_tab={Number(default_tab)}/>
    </StreamLayout>
  )
}

export default StreamingSettingPage
