import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LiveChatInput from './LiveChatInput'
import { PaperChat } from '@components/Styled/chat'
import Bubble from './Bubble'
import Button from '@material-ui/core/Button'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { CellMeasurer, CellMeasurerCache, AutoSizer, List } from 'react-virtualized'
import { useRect } from '@utils/useRect'

interface chatProps {
  messages: any
  onSend: (payload: any) => void
  userId: number | null
  input: boolean
  onPressTime?: (time: any) => void
  timeJump?: boolean
  protection?: boolean
  ref?: any
}

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
})
const contentRef = React.createRef<HTMLDivElement>()

const LiveChat = forwardRef((props: chatProps, ref) => {
  const { onSend, messages, userId, input, onPressTime, timeJump, protection } = props
  const classes = useStyles()
  const [showScroll, setShowScroll] = useState(false)
  const [isBottom, setBottom] = useState<boolean>(true)
  const messagesEndRef = useRef<any>(null)
  const contentRect = useRect(contentRef)

  useImperativeHandle(ref, () => ({
    triggerScroll: () => {
      _scrollToBottom(messages.length)
    },
  }))

  useEffect(() => {
    cache.clearAll()
  }, [contentRect?.width])

  useEffect(() => {
    cache.clearAll()
    setTimeout(() => {
      if (isBottom) {
        _scrollToBottom(messages.length)
      }
    }, 10)
  }, [messages])

  const _scrollToBottom = (position) => {
    if (messagesEndRef.current != null && messagesEndRef) {
      messagesEndRef.current.scrollToRow(position)
      setShowScroll(false)
      setBottom(true)
    }
  }

  const _typing = () => {
    _scrollToBottom(messages.length)
  }

  const _onScroll = (e) => {
    const scrollPos = e.scrollTop + e.clientHeight
    const height = e.scrollHeight
    const offset = Math.abs(height - scrollPos)
    const bottomThreshold = 1
    if (offset < bottomThreshold) {
      setBottom(true)
    } else if (offset > bottomThreshold) {
      setBottom(false)
      if (offset > 200) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
  }

  function rowRenderer({ index, key, parent, style }) {
    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ measure }) => (
          <Bubble
            key={index}
            style={style}
            onLoad={measure}
            isMe={messages[index]?.userId == userId ? true : false}
            currentMessage={messages[index]}
            time={messages[index]?.streamTime}
            onPressTime={onPressTime ? onPressTime : undefined}
            timeJump={timeJump}
          />
        )}
      </CellMeasurer>
    )
  }

  return (
    <PaperChat variant="outlined" square>
      <div ref={contentRef} className={classes.liveChatWindow}>
        <div className={input ? classes.liveChatWithInput : classes.liveChatWrapper}>
          <Button
            style={{ display: showScroll ? 'flex' : 'none' }}
            variant="contained"
            color="primary"
            className={classes.bottomArrow}
            onClick={() => _scrollToBottom(messages.length)}
            aria-label="scroll bottom"
            size="small"
          >
            <ArrowDownwardIcon />
          </Button>
          <AutoSizer style={{ flex: 1 }}>
            {({ height, width }) => (
              <List
                ref={messagesEndRef}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                onScroll={_onScroll}
                className="list-container-live"
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
        {input ? <LiveChatInput typing={_typing} protection={protection} send={onSend} /> : null}
      </div>
    </PaperChat>
  )
})

const useStyles = makeStyles(() => ({
  bottomArrow: {
    borderRadius: 50,
    padding: 0,
    minWidth: 40,
    minHeight: 38,
    width: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    background: '#FF4786 !important',
    margin: '0 auto',
    bottom: 10,
    cursor: 'pointer',
    zIndex: 100,
    color: '#fff',
  },
  liveChatWindow: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  liveChatWithInput: {
    height: 'auto',
    flex: 1,
    display: 'flex',
  },
  liveChatWrapper: {
    width: '100%',
    background: '#212121',
    padding: '8px',
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    '& textarea': {
      overflow: 'hidden',
    },
  },
}))

export default LiveChat

LiveChat.defaultProps = {
  input: true,
  timeJump: false,
  protection: false,
}
