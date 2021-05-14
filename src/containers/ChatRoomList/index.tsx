import RoomListItem from '@components/Chat/RoomListItem'
import List from '@material-ui/core/List'
import { ChatDataType } from '@components/Chat/types/chat.types'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

interface ChatRoomListProps {
  expand?: boolean
  listCliked?: () => void
}

const ChatListExample: ChatDataType[] = [
  {
    unseenCount: 0,
    chatRoomId: '1243',
    lastMsgAt: 1620109342592,
    roomName: 'Name of the room Long Name Long',
    lastMsg: 'asdasdsad',
    roomImg:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BNTk2OGU4NzktODhhOC00Nzc2LWIyNzYtOWViMjljZGFiNTMxXkEyXkFqcGdeQXVyMTE1NTQwOTk@._V1_UY256_CR12,0,172,256_AL_.jpg',
    sortKey: '123123',
    createdAt: 1620794831,
    groupType: 1,
    isAdmin: false,
  },
  {
    unseenCount: 100,
    chatRoomId: '1233',
    lastMsgAt: 1620109342592,
    roomName: 'sadsadsad',
    lastMsg: 'asdasdsad',
    roomImg:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BNTk2OGU4NzktODhhOC00Nzc2LWIyNzYtOWViMjljZGFiNTMxXkEyXkFqcGdeQXVyMTE1NTQwOTk@._V1_UY256_CR12,0,172,256_AL_.jpg',
    sortKey: '123123',
    createdAt: 1620794831,
    groupType: 1,
    isAdmin: false,
  },
  {
    unseenCount: 4,
    chatRoomId: '1253',
    lastMsgAt: 1620109342592,
    roomName: 'Name of the room',
    lastMsg: 'asdasdsad',
    roomImg: 'https://uifaces.co/our-content/donated/DUhuoeI8.jpg',
    sortKey: '123123',
    createdAt: 1620794831,
    groupType: 1,
    isAdmin: false,
  },
]

const ChatRoomList: React.FC<ChatRoomListProps> = ({ expand, listCliked }) => {
  const router = useRouter()

  const { id } = router.query

  const navigateRoom = (id: string) => {
    router.push(`${ESRoutes.MESSAGE}${id}`, undefined, { shallow: true })
    listCliked ? listCliked() : undefined
  }

  return (
    <List>
      {ChatListExample.map((item, index) => (
        <RoomListItem selected={id === item.chatRoomId ? true : false} onClick={navigateRoom} expand={expand} item={item} key={index} />
      ))}
    </List>
  )
}

ChatRoomList.defaultProps = {
  expand: true,
}

export default ChatRoomList
