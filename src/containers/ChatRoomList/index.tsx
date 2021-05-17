import { useEffect } from 'react'
import RoomListItem from '@components/Chat/RoomListItem'
import MuiList from '@material-ui/core/List'
import { ChatDataType } from '@components/Chat/types/chat.types'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { socketActions } from '@store/socket/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getAuth } from '@store/auth/selectors'
import { getRoomList } from '@store/socket/selectors'
import _ from 'lodash'
import Loader from '@components/Loader'
import Box from '@material-ui/core/Box'

interface ChatRoomListProps {
  expand?: boolean
  listCliked?: () => void
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ expand, listCliked }) => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const user = useAppSelector(getAuth)
  const userId = user.id
  const listData = useAppSelector(getRoomList)

  useEffect(() => {
    if (userId) {
      dispatch(
        socketActions.socketSend({
          action: 'GET_ALL_ROOMS',
          userId: userId,
        })
      )
    }
  }, [])

  const navigateRoom = (id: string) => {
    router.push(`${ESRoutes.MESSAGE}${id}`, undefined, { shallow: true })
    listCliked ? listCliked() : undefined
  }

  const Row = (props: { index: number; style: React.CSSProperties; data: ChatDataType[] }) => {
    const { index, style, data } = props
    const item = data[index]
    return (
      <div style={style} key={index}>
        <RoomListItem selected={id === item.chatRoomId ? true : false} onClick={navigateRoom} expand={expand} item={item} />
      </div>
    )
  }

  const renderPlaceHolder = () => {
    if (_.isEmpty(listData) && listData === []) {
      return <div>Empty</div>
    }
    return null
  }

  const renderList = () => {
    if (listData !== undefined) {
      return (
        <AutoSizer className="scroll-bar">
          {({ height, width }) => (
            <List itemSize={66} itemCount={listData.length} height={height} width={width} itemData={listData}>
              {Row}
            </List>
          )}
        </AutoSizer>
      )
    }
    return null
  }

  const renderLoader = () => {
    return (
      <Box className="small-loader centered">
        <Loader />
      </Box>
    )
  }

  return (
    <MuiList style={{ height: '100%' }}>
      {renderLoader()}
      {renderList()}
      {renderPlaceHolder()}
    </MuiList>
  )
}

ChatRoomList.defaultProps = {
  expand: true,
}

export default ChatRoomList
