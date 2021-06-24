import RoomListItem from '@components/Chat/RoomListItem'
import MuiList from '@material-ui/core/List'
import { ChatDataType } from '@components/Chat/types/chat.types'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { getRoomList } from '@store/socket/selectors'
import _ from 'lodash'
import Loader from '@components/Loader'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import { useAppSelector } from '@store/hooks'
import i18n from '@locales/i18n'

interface ChatRoomListProps {
  expand?: boolean
  listCliked?: () => void
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ expand, listCliked }) => {
  const router = useRouter()
  const { id } = router.query
  const listData = useAppSelector(getRoomList)
  const classes = useStyles()

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
    if (_.isEmpty(listData)) {
      return (
        <Box height={'100%'} width={'100%'} display="flex" justifyContent="center" alignItems="center">
          {i18n.t('common:common.no_data')}
        </Box>
      )
    }
    return null
  }

  const renderList = () => {
    if (listData !== undefined) {
      return (
        <AutoSizer className="scroll-bar">
          {({ height, width }) => (
            <List overscanCount={10} itemSize={70} itemCount={listData.length} height={height} width={width} itemData={listData}>
              {Row}
            </List>
          )}
        </AutoSizer>
      )
    }
    return null
  }

  const renderLoader = () => {
    if (listData == null) {
      return (
        <Box height={'100%'} width={'100%'} display="flex" justifyContent="center" alignItems="center">
          <Box className={classes.loaderBox}>
            <Loader />
          </Box>
        </Box>
      )
    }
    return null
  }

  return (
    <MuiList className={classes.root}>
      {renderLoader()}
      {renderList()}
      {renderPlaceHolder()}
    </MuiList>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    padding: 0,
  },
  loaderBox: {
    width: 20,
    height: 20,
    margin: '0 auto',
    '& svg': {
      width: '100%',
    },
  },
}))

ChatRoomList.defaultProps = {
  expand: true,
}

export default ChatRoomList
