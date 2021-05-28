import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatRoomCreateContainer from '@containers/ChatRoomCreateContainer'

const Room: PageWithLayoutType = () => {
  return <ChatRoomCreateContainer />
}

Room.Layout = MessageLayout

export default Room
