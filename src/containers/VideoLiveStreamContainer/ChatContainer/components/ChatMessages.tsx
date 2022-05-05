import React, { useEffect } from 'react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { AutoSizer, CellMeasurer, List, CellMeasurerCache } from 'react-virtualized'
import useStyles from '@containers/VideoLiveStreamContainer/ChatContainer/styles'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import DonateMessage from '@containers/VideoLiveStreamContainer/ChatContainer/DonateMessage'
import ChatTextMessage from '@containers/VideoLiveStreamContainer/ChatContainer/ChatTextMessage'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import { useRect } from '@utils/useRect'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'

interface Props {
  //   cache: CellMeasurerCache
  chatInputHeight: number
  messagesEndRef: React.MutableRefObject<any>
  stateMessages: any[]
  isStreamer?: number
  isTipTab: boolean
  videoType: number
  deleteMsg: (message: any) => void
  resendMess: (message: any) => void
  reDeleteMess: (message: any) => void
  handleScrollToBottom: () => void
  isGettingRewindMess: boolean
  setScrolling: any
  setBottom: any
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 25,
})

const ChatMessages: React.FC<Props> = ({
  //   cache,
  chatInputHeight,
  messagesEndRef,
  stateMessages,
  // _onScroll,
  isStreamer,
  videoType,
  isTipTab,
  deleteMsg,
  resendMess,
  reDeleteMess,
  handleScrollToBottom,
  setBottom,
  setScrolling,
  isGettingRewindMess,
}) => {
  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })
  const theme = useTheme()
  const contentRef = React.createRef<HTMLDivElement>()
  const { width: videoDisplayWidth } = useWindowDimensions(0)
  const matchSm = useMediaQuery(theme.breakpoints.down(769))
  const isDown1100 = useMediaQuery(theme.breakpoints.down(1100), { noSsr: true })
  const isDown960 = useMediaQuery(theme.breakpoints.down(960), { noSsr: true })
  const matchMd = useMediaQuery(theme.breakpoints.down(1025))
  const { getMessageWithoutNgWords } = useCheckNgWord()

  const chatBoardWidth = () => {
    if (!isDown1100) return 482
    if (!matchSm) return 350
    return 0
  }
  const sizeMenuWidth = () => {
    if (!isDown960) return 98
    return 0
  }

  const calculateVideoHeight = () => {
    const videoWidth = videoDisplayWidth - (chatBoardWidth() + sizeMenuWidth())
    return (videoWidth * 9) / 16 + 80
  }

  const contentRect = useRect(contentRef)

  const _onScroll = (e) => {
    const scrollPos = e.scrollTop + e.clientHeight
    // console.log('🚀 ~ test--scrollTop', e.scrollTop)
    // console.log('🚀 ~ test--clientHeight', e.clientHeight)
    // console.log('🚀 ~ test--scrollHeight', e.scrollHeight)
    // console.log('🚀 ~ test--333', isGettingRewindMess)
    const height = e.scrollHeight
    const offset = Math.abs(height - scrollPos)
    // console.log('🚀 ~ checkMessIsInBottom ~ offset', offset)
    const bottomThreshold = 150
    // only fetch prev mess when no rewind
    if (!isGettingRewindMess && e.scrollTop <= 0) {
      // console.log('🚀 ~ checkMessIsInBottom ~ e.scrollTop <= 0', e.scrollTop <= 0)
      // handle this later
      setScrolling((prev) => prev + 1)
    }
    if (offset < bottomThreshold) {
      // console.log('🚀 ~ useEffect ~ setBottom', 222)
      setBottom(true)
    } else if (offset > bottomThreshold) {
      // console.log('🚀 ~ useEffect ~ setBottom', 333)
      if (stateMessages.length) {
        // console.log('🚀 ~ checkMessIsInBottom ~ stateMessages.length', stateMessages.length)
        setBottom(false)
      }
    }
  }

  useEffect(() => {
    cache.clearAll()
  }, [contentRect?.width])

  useEffect(() => {
    setTimeout(handleScrollToBottom, 10)
    cache.clearAll()
    // console.log('🚀 ~ useEffect ~ cache---000', cache)
  }, [stateMessages])

  // console.log('-------------- Chat component rerender message list-----------------')

  const rowRenderer = ({ index, key, style, parent }) => {
    const msg = stateMessages[index]
    return (
      <CellMeasurer cache={cache} columnIndex={0} columnCount={1} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => (
          <div key={key} style={style} ref={registerChild}>
            {!msg.delete_flag || isStreamer ? (
              msg.is_premium ? (
                <DonateMessage
                  key={index}
                  message={msg}
                  videoType={videoType}
                  deleteMess={deleteMsg}
                  getMessageWithoutNgWords={getMessageWithoutNgWords}
                  is_streamer={isStreamer}
                  resendMess={resendMess}
                  reDeleteMess={reDeleteMess}
                />
              ) : isTipTab ? null : (
                // no display normal mess on tab tip
                <ChatTextMessage
                  key={index}
                  message={msg}
                  videoType={videoType}
                  getMessageWithoutNgWords={getMessageWithoutNgWords}
                  deleteMess={deleteMsg}
                  is_streamer={isStreamer}
                  resendMess={resendMess}
                  reDeleteMess={reDeleteMess}
                />
              )
            ) : null}
          </div>
        )}
      </CellMeasurer>
    )
  }

  return (
    <div
      className={classes.chatBoard}
      id="chatBoard"
      ref={contentRef}
      style={{
        marginBottom: (matchSm && !isLandscape) || (!matchSm && matchMd && isLandscape) ? chatInputHeight : 0,
        height: matchSm ? `calc(100vh -  ${calculateVideoHeight()}px)` : '100%',
      }}
    >
      <AutoSizer
        style={{ flex: 1 }}
        onResize={() => {
          cache.clearAll()
        }}
      >
        {({ height, width }) => {
          // console.log('🚀 ~ MessageList ~ height', height)
          return (
            <List
              ref={messagesEndRef}
              onScroll={(e) => _onScroll(e)}
              overscanRowsCount={10}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              // rowHeight={25}
              rowRenderer={rowRenderer}
              rowCount={stateMessages.length}
              className={classes.listContainer}
              id="list_mess"
              height={height}
              width={width}
            />
          )
        }}
      </AutoSizer>
      {/* <div>Chat messages</div> */}
    </div>
  )
}

export default ChatMessages
