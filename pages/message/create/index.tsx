import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatRoomCreateContainer from '@containers/ChatRoomCreateContainer'
import { withAuth } from '@utils/withAuth'

const Room: PageWithLayoutType = () => {
  return (
    <MessageLayout defaultListState={false} create={true}>
      <ChatRoomCreateContainer />
    </MessageLayout>
  )
}

export default withAuth(Room)
