import { useRouter } from 'next/router'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatMemberEditContainer from '@containers/ChatMemberEditContainer'
import { socketReady } from '@store/socket/selectors'
import { useAppSelector } from '@store/hooks'

const RoomMemberEdit: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query
  const socketStatus = useAppSelector(socketReady)

  return socketStatus ? <ChatMemberEditContainer roomId={id} /> : null
}

RoomMemberEdit.Layout = MessageLayout

export default RoomMemberEdit
