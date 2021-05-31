import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { ChatRoomMemberItem, MessageType } from '../types/chat.types'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { SystemMessage, Bubble, DateTitle, MessageMenu } from '../elements'
import Avatar from '@components/Avatar'
import useSmartTime from '@utils/hooks/useSmartTime'
import _ from 'lodash'
import { ESReportProps } from '@containers/Report'
import { MENU_ACTIONS } from '../constants'

export interface MessageProps {
  direction: 'left' | 'right'
  currentMessage?: MessageType
  users: ChatRoomMemberItem[]
  navigateToProfile?: (id: string) => void
  onLoadImage: () => void
  reply?: (currentMessage: MessageType) => void
  report?: (reportData: ESReportProps) => void
  copy?: (currrentMessage: MessageType) => void
}

const Message: React.FC<MessageProps> = (props) => {
  const classes = useStyles()

  const { currentMessage, direction, navigateToProfile, reply, report, copy, users } = props

  const message = _.get(currentMessage, 'msg', '')

  const userData = users
    ? _.find(users, function (o) {
        return o?.userId === currentMessage?.userId
      })
    : []

  const avatar = _.get(userData, 'profile', '')
  const nickName = _.get(userData, 'nickName', '')
  const userCode = _.get(userData, 'userCode', '')

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

  const actionHandlers = {
    [MENU_ACTIONS.COPY_CONTENT]: copy && copy,
    [MENU_ACTIONS.REPLY_MSG]: reply && reply,
  }

  const onMenuAction = (type: MENU_ACTIONS) => {
    const handler = actionHandlers[type]

    if (handler && type === MENU_ACTIONS.REPORT_CHAT) {
      const data = {
        attributes: {
          nickname: nickName,
          avatar_url: avatar,
          user_code: userCode,
        },
      }
      const reportData: ESReportProps = {
        data: data,
        room_id: currentMessage?.chatRoomId,
        chat_id: currentMessage?.clientId,
        msg_body: currentMessage?.msg,
        target_id: currentMessage?.userId,
      }
      report(reportData)
    } else {
      handler && handler(currentMessage)
    }
  }

  const renderBubbleGroup = () => {
    if (currentMessage && currentMessage.type !== CHAT_MESSAGE_TYPE.DATE && currentMessage.type !== CHAT_MESSAGE_TYPE.WELCOME) {
      return (
        <Box className={direction === 'left' ? classes.left : classes.right}>
          {direction === 'left' ? renderAvatar() : null}
          <Box className={direction === 'left' ? classes.wrapperLeft : classes.wrapperRight}>
            <Box className={direction === 'left' ? classes.menuLeft : classes.menuRight}>
              <MessageMenu onPressMenuItem={onMenuAction} />
            </Box>
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
  menuRight: {
    position: 'absolute',
    left: '-28px',
    bottom: 8,
  },
  menuLeft: {
    position: 'absolute',
    right: '-28px',
    bottom: 8,
  },
  section: {
    width: '100%',
    height: 'auto',
    display: 'block',
    position: 'relative',
    paddingTop: 10,
    marginTop: 20,
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
    position: 'relative',
    '& $time': {
      textAlign: 'left',
    },
  },
  wrapperRight: {
    position: 'relative',
    marginRight: 16,
    '& $time': {
      textAlign: 'right',
    },
  },
}))

Message.defaultProps = {}

export default Message
