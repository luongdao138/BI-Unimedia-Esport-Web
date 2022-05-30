import StreamLayout from '@layouts/StreamLayout'
import PageWithLayoutType from '@constants/page'
import { useRouter } from 'next/router'
import { useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import { useEffect, useState } from 'react'
import { ESRoutes } from '@constants/route.constants'
import { getIsAuthenticated } from '@store/auth/selectors'
import GiftReportContainer from '@containers/GiftReportContainer'

const StreamingSettingPage: PageWithLayoutType = () => {
  const router = useRouter()
  const [isStreamer, setIsStreamer] = useState<boolean>(false)
  const default_tab = router?.query?.default_tab || 0
  // const { makeContextualHref } = useContextualRouting()
  const { selectors } = userProfileStore
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const userProfile = useAppSelector(selectors.getUserProfile)

  useEffect(() => {
    if (userProfile) {
      const originIsStreamer = userProfile?.attributes?.delivery_flag || false
      isAuthenticated && !originIsStreamer && router.push(ESRoutes.NOT_FOUND)
      setIsStreamer(originIsStreamer)
    }
  }, [userProfile])

  return <StreamLayout loginRequired>{isStreamer && <GiftReportContainer default_tab={Number(default_tab)} />}</StreamLayout>
}

export default StreamingSettingPage
