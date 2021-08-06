import React from 'react'
import Time from './elements/Time'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import Box from '@material-ui/core/Box'
import { Colors } from '@theme/live/colors'
import { makeStyles } from '@material-ui/core/styles'

export interface BubbleProps {
  isMe: boolean
  currentMessage?: any
  renderUsername?(): React.ReactNode
  time?: number | undefined
  type?: CHAT_MESSAGE_TYPE.TEXT_MESSAGE
  onPressTime?: (event) => void
  timeJump?: boolean
  onLoad?: any
  style?: any
}

const useStyles = makeStyles(() => ({
  bubble: {
    position: 'relative',
    paddingRight: 50,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
  },
  timeBox: {
    position: 'absolute',
    top: 12,
    right: 8,
  },
  nicknameBox: {
    position: 'relative',
    maxWidth: '100%',
    overflow: 'hidden',
    paddingRight: 10,
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    marginBottom: -5,
  },
  messageText: {
    fontSize: 11,
    paddingRight: 10,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
}))

const Bubble: React.FC<BubbleProps> = (props) => {
  const { time, currentMessage, onPressTime, isMe, timeJump, onLoad, style } = props

  const classes = useStyles()

  const renderMessageText = () => {
    const { currentMessage } = props
    return (
      <span
        className={classes.messageText}
        // noWrap={false}
      >
        {currentMessage?.msg}
      </span>
    )
  }

  const renderTime = () => {
    if (props.currentMessage && time) {
      const { time } = props
      return (
        <Box
          style={{ cursor: timeJump ? 'pointer' : 'inherit' }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={onPressTime && time ? () => onPressTime(time < 0 ? 0 : time) : () => {}}
        >
          <Time time={time} />
        </Box>
      )
    }
    return <div></div>
  }

  const renderUsername = () => {
    const nickName = currentMessage?.nickName + ''
    return (
      <Box className={classes.nicknameBox} display="inline-block">
        <span
          style={{
            fontSize: 11,
            color: isMe ? Colors.yellow : '#FF84AE',
            whiteSpace: 'nowrap',
          }}
        >
          {nickName}
        </span>
      </Box>
    )
  }

  return (
    <Box onLoad={onLoad} style={style} className={classes.bubble}>
      <Box
        display="inline"
        // flexGrow={1}
      >
        {renderUsername()}
        {renderMessageText()}
      </Box>
      <Box className={classes.timeBox}>{renderTime()}</Box>
    </Box>
  )
}

Bubble.defaultProps = {
  currentMessage: {
    eventId: '',
    createdAt: 0,
    userId: null,
    msg: '',
    sent: false,
    clientId: '',
  },
  type: CHAT_MESSAGE_TYPE.TEXT_MESSAGE,
  isMe: false,
  timeJump: false,
  style: {},
}

export default Bubble
