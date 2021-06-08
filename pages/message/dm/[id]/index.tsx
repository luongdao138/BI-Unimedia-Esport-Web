import { useEffect } from 'react'
import { useRouter } from 'next/router'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatRoomCreateContainer from '@containers/ChatRoomCreateContainer'
import _ from 'lodash'
import { ESRoutes } from '@constants/route.constants'
import useDirectCheck from '@containers/ChatRoomCreateContainer/useDirectCheck'

const DirectCreate: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query
  const { checkRoom, roomMeta, singleUserData, redirectRoomData } = useDirectCheck()
  const singleUser = singleUserData
  const roomId = redirectRoomData

  useEffect(() => {
    if (id && _.isString(id)) {
      // dispatch backend
      checkRoom(id)
    }
  }, [id])

  useEffect(() => {
    if (roomId !== null && roomMeta.loaded && !roomMeta.pending && !roomMeta.error) {
      // dispatch backend
      router.push(`${ESRoutes.MESSAGE}${roomId}`, undefined, { shallow: true })
    }
  }, [roomId])

  // meta.success, meta.error check with response

  return <>{_.isEmpty(singleUser) ? <div>Loading</div> : <ChatRoomCreateContainer dm={true} singleUser={singleUser} />}</>
}

DirectCreate.Layout = MessageLayout

export default DirectCreate
