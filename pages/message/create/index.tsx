import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatRoomCreateContainer from '@containers/ChatRoomCreateContainer'

const Room: PageWithLayoutType = () => {
  return (
    <MessageLayout defaultListState={false} create={true}>
      <ChatRoomCreateContainer />
    </MessageLayout>
  )
}

export default Room
