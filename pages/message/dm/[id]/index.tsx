import { useEffect } from 'react'
import { useRouter } from 'next/router'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatRoomCreateContainer from '@containers/ChatRoomCreateContainer'
import _ from 'lodash'
import { ESRoutes } from '@constants/route.constants'

const DirectCreate: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query
  const singleUser = null
  const roomId = null

  useEffect(() => {
    if (id) {
      // dispatch backend
    }
  }, [id])

  useEffect(() => {
    if (roomId !== null) {
      // dispatch backend
      router.push(`${ESRoutes.MESSAGE}${roomId}`, undefined, { shallow: true })
    }
  }, [roomId])

  // meta.success, meta.error check with response

  return <>{_.isEmpty(singleUser) ? <div>Loading</div> : <ChatRoomCreateContainer dm={true} singleUser={singleUser} />}</>
}

DirectCreate.Layout = MessageLayout

export default DirectCreate
