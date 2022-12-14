import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import userProfileStore from '@store/userProfile'
import StreamingGiftManagement from '@containers/StreamingGiftManagement'

const StreamingManagePage: PageWithLayoutType = () => {
  const router = useRouter()
  const [isStreamer, setIsStreamer] = useState<boolean>(false)
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

  return (
    <StreamLayout loginRequired paddedBottom>
      {isStreamer && <StreamingGiftManagement />}
    </StreamLayout>
  )
}

export default StreamingManagePage
