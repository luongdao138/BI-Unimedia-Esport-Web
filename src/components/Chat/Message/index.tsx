import React from 'react'
import { Box, makeStyles, Typography, Icon } from '@material-ui/core'
import { ChatRoomMemberItem, ChatSuggestionList, MessageType, ParentItem } from '../types/chat.types'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { SystemMessage, Bubble, DateTitle, MessageMenu } from '../elements'
import Avatar from '@components/Avatar'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import _ from 'lodash'
import { ESReportProps } from '@containers/Report'
import { MENU_ACTIONS } from '../constants'
import { Colors } from '@theme/colors'

export interface MessageProps {
  direction: 'left' | 'right'
  currentMessage?: MessageType
  users: ChatRoomMemberItem[] | ChatSuggestionList[]
  navigateToProfile?: (code: string) => void
  onLoadImage?: () => void
  reply?: (currentMessage: MessageType) => void
  report?: (reportData: ESReportProps) => void
  onDelete?: (currentMessage: MessageType) => void
  copy?: (currrentMessage: MessageType) => void
  onReplyClick?: (replyMessage: null | ParentItem | string | MessageType) => void
}

const Message: React.FC<MessageProps> = (props) => {
  const classes = useStyles()

  const { currentMessage, direction, onDelete, navigateToProfile, reply, report, copy, users, onReplyClick } = props

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
  const time = CommonHelper.staticSmartTime(timestamp)
  const status = _.get(currentMessage, 'sent', false)

  const renderAvatar = () => {
    return (
      <Box style={{ cursor: 'pointer' }}>
        <Avatar onClick={() => navigateToProfile(userCode)} size={36} src={avatar} alt={nickName} />
      </Box>
    )
  }

  const renderTime = () => {
    return (
      <Box className={classes.time}>
        <Typography className={classes.timeText}>{time}</Typography>
      </Box>
    )
  }

  const renderBubble = () => {
    return (
      <Bubble
        onReplyClick={onReplyClick}
        onLoadImage={props.onLoadImage && props.onLoadImage}
        navigateToProfile={navigateToProfile}
        {...props}
      />
    )
  }

  const actionHandlers = {
    [MENU_ACTIONS.COPY_CONTENT]: copy && copy,
    [MENU_ACTIONS.REPLY_MSG]: reply && reply,
    [MENU_ACTIONS.DELETE_MESSAGE]: onDelete && onDelete,
  }

  const onMenuAction = (type: MENU_ACTIONS) => {
    const handler = actionHandlers[type]

    if (type === MENU_ACTIONS.REPORT_CHAT) {
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

  const renderStatus = () => {
    if (direction === 'right') {
      if (status === true) {
        return <Icon className={`${classes.iconStatus} fa fa-check`} />
      } else {
        return <Icon className={`${classes.iconStatus} fa fa-clock`} />
      }
    }
    return null
  }

  const renderBubbleGroup = () => {
    if (currentMessage && currentMessage.type !== CHAT_MESSAGE_TYPE.DATE && currentMessage.type !== CHAT_MESSAGE_TYPE.WELCOME) {
      return (
        <Box className={direction === 'left' ? classes.left : classes.right}>
          {direction === 'left' ? renderAvatar() : null}
          <Box className={direction === 'left' ? classes.wrapperLeft : classes.wrapperRight}>
            <Box className={direction === 'left' ? classes.menuLeft : classes.menuRight}>
              <MessageMenu isMe={direction === 'left' ? false : true} onPressMenuItem={onMenuAction} />
            </Box>
            {renderBubble()}
            <Box flexDirection="row" display="flex" justifyContent={direction === 'left' ? 'flex-start' : 'flex-end'} alignItems="center">
              {renderTime()}
              {renderStatus()}
            </Box>
          </Box>
          {direction === 'right' ? renderAvatar() : null}
        </Box>
      )
    }
    return null
  }

  const renderSystemMessage = () => {
    if (currentMessage && currentMessage.type === CHAT_MESSAGE_TYPE.WELCOME) {
      return <SystemMessage text={message} time={timestamp} />
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
  iconStatus: {
    fontSize: 10,
    marginLeft: 10,
    marginTop: 4,
    color: Colors.grey[200],
  },
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
    width: 'calc((70%) + (36px) + (16px))',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    transform: 'will-change',
  },
  right: {
    marginLeft: 'auto',
    width: 'calc((70%) + (36px) + (16px))',
    transform: 'will-change',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: Colors.text[300],
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
