import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { ChatRoomMemberItem, MessageType } from '../types/chat.types'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { SystemMessage, Bubble } from '../elements'
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
        <Typography>{time}</Typography>
      </Box>
    )
  }

  const renderBubble = () => {
    return <Bubble onLoadImage={props.onLoadImage} navigateToProfile={navigateToProfile} {...props} />
  }

  const renderSystemMessage = () => {
    return <SystemMessage text={message} />
  }

  return (
    <Box className={classes.section}>
      {currentMessage && currentMessage.type === CHAT_MESSAGE_TYPE.WELCOME ? (
        renderSystemMessage()
      ) : (
        <Box className={direction === 'left' ? classes.left : classes.right}>
          {direction === 'left' ? renderAvatar() : null}
          <Box className={direction === 'left' ? classes.wrapperLeft : classes.wrapperRight}>
            {renderBubble()}
            {renderTime()}
          </Box>
          {direction === 'right' ? renderAvatar() : null}
        </Box>
      )}
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
    border: '1px dotted grey',
  },
  left: {
    marginRight: 'auto',
    maxWidth: 280,
    height: '100%',
    width: '100%',
    display: 'inline-block',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    marginLeft: 'auto',
    maxWidth: 280,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  time: {
    height: 20,
  },
  wrapperLeft: {
    marginLeft: 16,
  },
  wrapperRight: {
    marginRight: 16,
  },
}))

Message.defaultProps = {}

export default Message
