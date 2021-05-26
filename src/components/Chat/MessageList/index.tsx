import React, { useRef, useEffect, useState } from 'react'
import { ChatRoomMemberItem, MessageType } from '../types/chat.types'
import { Box, makeStyles, IconButton, Icon } from '@material-ui/core'
import AutoSizer from 'react-virtualized-auto-sizer'
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import { useRect } from '@utils/hooks/useRect'
import TextMessage from '@components/Chat/elements/TextMessage'
import PhotoMessage from '@components/Chat/elements/PhotoMessage'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { Colors } from '@theme/colors'
import Loader from '@components/Loader'

export interface MessageListProps {
  messages: MessageType[]
  users: ChatRoomMemberItem[]
  onFetchMore?: () => void
  paginating?: boolean
}

const cache = new CellMeasurerCache({
  defaultHeight: 100,
  fixedWidth: true,
})

const contentRef = React.createRef<HTMLDivElement>()

const MessageList: React.FC<MessageListProps> = (props) => {
  const { messages, users, onFetchMore, paginating } = props
  const [showScroll, setShowScroll] = useState(false)
  const [isBottom, setBottom] = useState<boolean>(true)
  const [scrolling, setScrolling] = useState<number>(0)
  const messagesEndRef = useRef<any>(null)
  const contentRect = useRect(contentRef)
  const classes = useStyles()

  useEffect(() => {
    cache.clearAll()
    setTimeout(() => {
      if (isBottom) {
        _scrollToBottom(messages.length)
      } else if (messages.length > 10 && messagesEndRef.current != null && messagesEndRef) {
        messagesEndRef.current.scrollToRow(9)
      }
    }, 10)
  }, [messages])

  useEffect(() => {
    if (scrolling > 1) {
      onFetchMore && onFetchMore()
    }
  }, [scrolling])

  useEffect(() => {
    cache.clearAll()
  }, [contentRect?.width])

  const _scrollToBottom = (position) => {
    if (messagesEndRef.current != null && messagesEndRef) {
      messagesEndRef.current.scrollToRow(position)
      setShowScroll(false)
      setBottom(true)
    }
  }

  const _onScroll = (e) => {
    const scrollPos = e.scrollTop + e.clientHeight
    const height = e.scrollHeight
    const offset = Math.abs(height - scrollPos)
    const bottomThreshold = 1
    if (e.scrollTop <= 0) {
      // handle this later
      setScrolling(scrolling + 1)
    }
    if (offset < bottomThreshold) {
      setBottom(true)
    } else if (offset > bottomThreshold) {
      setBottom(false)
      if (offset > 150) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
  }

  const rowRenderer = ({ index, key, parent, style }) => {
    const item = messages[index]

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ measure }) => (
          <div key={index} onLoad={measure} style={style}>
            <Box
              style={{
                padding: 10,
                marginBottom: 5,
                minHeight: 80,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: 'auto',
                background: item.sent ? '#555' : '#212121',
                display: 'block',
              }}
            >
              {item.type === CHAT_MESSAGE_TYPE.IMAGE ? (
                <PhotoMessage currentMessage={item.msg} />
              ) : (
                <TextMessage members={users} text={item.msg} />
              )}
            </Box>
          </div>
        )}
      </CellMeasurer>
    )
  }

  const renderLoader = () => {
    if (paginating === true) {
      return (
        <Box className={classes.loaderBox}>
          <Loader />
        </Box>
      )
    }
    return null
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <IconButton
        disableRipple
        style={{ display: showScroll ? 'flex' : 'none' }}
        className={classes.bottomArrow}
        onClick={() => _scrollToBottom(messages.length)}
        aria-label="scroll bottom"
        size="small"
      >
        <Icon className={`${classes.icon} fa fa-angle-down`} />
      </IconButton>
      {renderLoader()}

      <AutoSizer style={{ flex: 1 }}>
        {({ height, width }) => (
          <List
            onScroll={_onScroll}
            ref={messagesEndRef}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            className={`list-container`}
            rowCount={messages.length}
            style={{
              outline: 0,
              marginRight: 10,
            }}
            height={height}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  bottomArrow: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    zIndex: 1000,
    background: Colors.white,
    '&:hover': {
      background: Colors.white,
    },
  },
  loaderBox: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    top: 10,
    margin: '0 auto',
    '& svg': {
      width: '100%',
    },
  },
  icon: {
    color: Colors.grey[200],
  },
}))

export default MessageList
