import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { ChatRoomMemberItem, MessageType } from '../types/chat.types'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { SystemMessage, Bubble, DateTitle } from '../elements'
import Avatar from '@components/Avatar'
import useSmartTime from '@utils/hooks/useSmartTime'
import _ from 'lodash'

export interface MessageProps {
  direction: 'left' | 'right'
  currentMessage?: MessageType
  users: ChatRoomMemberItem[]
  navigateToProfile?: (id: string) => void
  onLoadImage: () => void
}

const Message: React.FC<MessageProps> = (props) => {
  const classes = useStyles()

  const { currentMessage, direction, navigateToProfile } = props

  const message = _.get(currentMessage, 'msg', '')

  const avatar = _.get(currentMessage, 'profile', '')
  const nickName = _.get(currentMessage, 'nickName', '')
  const timestamp = _.get(currentMessage, 'createdAt', '')
  const time = useSmartTime(timestamp)

  const renderAvatar = () => {
    return <Avatar size={36} src={avatar} alt={nickName} />
  }

  const renderTime = () => {
    return (
      <Box className={classes.time}>
        <Typography className={classes.timeText}>{time}</Typography>
      </Box>
    )
  }

  const renderBubble = () => {
    return <Bubble onLoadImage={props.onLoadImage} navigateToProfile={navigateToProfile} {...props} />
  }

  const renderBubbleGroup = () => {
    if (currentMessage && currentMessage.type !== CHAT_MESSAGE_TYPE.DATE && currentMessage.type !== CHAT_MESSAGE_TYPE.WELCOME) {
      return (
        <Box className={direction === 'left' ? classes.left : classes.right}>
          {direction === 'left' ? renderAvatar() : null}
          <Box className={direction === 'left' ? classes.wrapperLeft : classes.wrapperRight}>
            {renderBubble()}
            {renderTime()}
          </Box>
          {direction === 'right' ? renderAvatar() : null}
        </Box>
      )
    }
    return null
  }

  const renderSystemMessage = () => {
    if (
      (currentMessage && currentMessage.type === CHAT_MESSAGE_TYPE.WELCOME) ||
      (currentMessage && currentMessage.type === CHAT_MESSAGE_TYPE.SYSTEM)
    ) {
      return <SystemMessage text={message} />
    }
    return null
  }

  const renderSectionTitle = () => {
    const date = _.get(currentMessage, 'title', '')
    if (currentMessage && currentMessage.type === CHAT_MESSAGE_TYPE.DATE) {
      return <DateTitle text={date} />
    }
    return null
  }

  return (
    <Box className={classes.section}>
      {renderSectionTitle()}
      {renderSystemMessage()}
      {renderBubbleGroup()}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  section: {
    width: '100%',
    height: 'auto',
    display: 'block',
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 10,
    //debug only border: '1px dotted grey',
  },
  left: {
    marginRight: 'auto',
    width: 300,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    marginLeft: 'auto',
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timeText: {
    fontSize: 12,
  },
  time: {
    height: 15,
    marginTop: 3,
  },
  wrapperLeft: {
    marginLeft: 16,
    '& $time': {
      textAlign: 'left',
    },
  },
  wrapperRight: {
    marginRight: 16,
    '& $time': {
      textAlign: 'right',
    },
  },
}))

Message.defaultProps = {}

export default Message
