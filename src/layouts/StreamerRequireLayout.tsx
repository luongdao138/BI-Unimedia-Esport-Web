import React, { useEffect, useState } from 'react'
import StreamLayout from '@layouts/StreamLayout'
import { useRouter } from 'next/router'
import userProfileStore from '@store/userProfile'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'

interface StreamerLayoutProps {
  children: React.ReactNode
}

const StreamerRequireLayout: React.FC<StreamerLayoutProps> = ({ children }) => {
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

  return <StreamLayout loginRequired>{isStreamer && children}</StreamLayout>
}

export default StreamerRequireLayout
