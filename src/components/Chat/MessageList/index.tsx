import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { ChatRoomMemberItem, ChatSuggestionList, MessageType, ParentItem } from '../types/chat.types'
import { Box, makeStyles, IconButton, Icon } from '@material-ui/core'
import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from 'react-virtualized'
import { useRect } from '@utils/hooks/useRect'
// import Message from '@components/Chat/Message'
import { Colors } from '@theme/colors'
import Loader from '@components/Loader'
import Message from '../Message'
import { ESReportProps } from '@containers/Report'
import _ from 'lodash'

export interface MessageListProps {
  messages: MessageType[]
  users: ChatRoomMemberItem[] | ChatSuggestionList[]
  onFetchMore?: () => void
  paginating?: boolean
  currentUser: string | number
  reply?: (currentMessage: MessageType) => void
  report?: (reportData: ESReportProps) => void
  copy?: (currentMessage: MessageType) => void
  delete?: (currentMessage: MessageType) => void
  onReplyClick?: (replyMessage: null | ParentItem | string | MessageType) => void
  navigateToProfile?: (code: string) => void
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 95,
})

const contentRef = React.createRef<HTMLDivElement>()

const MessageList = forwardRef((props: MessageListProps, ref) => {
  const { messages, users, onFetchMore, paginating, currentUser, onReplyClick } = props
  const [isBottom, setBottom] = useState<boolean>(true)
  const [scrolling, setScrolling] = useState<number>(0)
  const messagesEndRef = useRef<any>(null)
  const contentRect = useRect(contentRef)
  const classes = useStyles()

  useImperativeHandle(ref, () => ({
    triggerScroll: () => {
      _scrollToBottom(messages.length)
    },
  }))

  useEffect(() => {
    setTimeout(() => {
      if (isBottom) {
        _scrollToBottom(messages.length)
        setBottom(true)
      } else if (messages.length > 10 && messagesEndRef.current != null && messagesEndRef) {
        messagesEndRef.current.scrollToRow(7)
      }
    }, 10)
    cache.clearAll()
  }, [messages])

  useEffect(() => {
    if (scrolling > 1) {
      onFetchMore && onFetchMore()
    }
  }, [scrolling])

  useEffect(() => {
    cache.clearAll()
  }, [contentRect?.width])

  const _scrollToBottom = (position: number) => {
    //https://github.com/bvaughn/react-virtualized/issues/995
    if (messagesEndRef.current != null && messagesEndRef) {
      messagesEndRef.current?.scrollToRow(position - 1)
      setTimeout(() => {
        messagesEndRef.current?.scrollToRow(position - 1)
        setBottom(true)
      }, 100)
    }
  }

  const _onScroll = (e) => {
    const scrollPos = e.scrollTop + e.clientHeight
    const height = e.scrollHeight
    const offset = Math.abs(height - scrollPos)
    const bottomThreshold = 150
    if (e.scrollTop <= 0) {
      // handle this later
      setScrolling(scrolling + 1)
    }
    if (offset < bottomThreshold) {
      setBottom(true)
    } else if (offset > bottomThreshold) {
      setBottom(false)
    }
  }

  const rowRenderer = ({ index, key, parent, style }) => {
    const data = messages[index]

    return (
      <CellMeasurer cache={cache} columnIndex={0} columnCount={1} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => (
          <div key={key} style={style} ref={registerChild}>
            <Message
              reply={props.reply}
              report={props.report}
              onReplyClick={onReplyClick}
              onDelete={props.delete}
              navigateToProfile={props.navigateToProfile}
              copy={props.copy}
              currentMessage={data}
              users={users}
              direction={_.get(data, 'userId', null) !== currentUser ? 'left' : 'right'}
            />
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
    <div style={{ width: '100%', height: '100%', position: 'relative' }} ref={contentRef}>
      <IconButton
        disableRipple
        style={{ display: !isBottom ? 'flex' : 'none' }}
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
            ref={messagesEndRef}
            onScroll={_onScroll}
            overscanRowsCount={10}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            rowCount={messages.length}
            className={'list-container'}
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
})

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
    zIndex: 1000,
    left: 0,
    right: 0,
    top: '0px',
    margin: '0 auto',
    '& svg': {
      width: '100%',
      color: 'red',
    },
  },
  icon: {
    color: Colors.grey[200],
  },
}))

export default MessageList
