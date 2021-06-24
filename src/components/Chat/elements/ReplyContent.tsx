import React from 'react'
import { Typography, Box, makeStyles, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Avatar from '@components/Avatar/'
import { ChatRoomMemberItem, MessageType, ParentItem, ChatSuggestionList } from '../types/chat.types'
import _ from 'lodash'
import TextMessage from './TextMessage'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import PhotoMessage from './PhotoMessage'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'

export interface ReplyContentProps {
  replyMessage: null | ParentItem | string | MessageType
  members?: ChatRoomMemberItem[] | ChatSuggestionList[]
  color: string
  showName?: boolean
  contentClass?: string
  numberOfLines?: number
  bgColor?: string
  onReplyClick?: (msg: null | ParentItem | string | MessageType) => void
}

const ReplyContent: React.FC<ReplyContentProps> = (props) => {
  const { replyMessage, members, color, showName, contentClass, numberOfLines, bgColor, onReplyClick } = props
  const classes = useStyles()

  const text = _.get(replyMessage, 'msg', '')
  const type = _.get(replyMessage, 'type', CHAT_MESSAGE_TYPE.TEXT)

  const userData = members
    ? _.find(members, function (o) {
        return o.userId === _.get(replyMessage, 'userId', null)
      })
    : []

  const avatar = _.get(userData, 'profile', '')
  const nickName = _.get(userData, 'nickName', '')
  const isDeleted = _.get(replyMessage, 'isDeleted', false)
  const renderText = () => {
    if (type === CHAT_MESSAGE_TYPE.TEXT) {
      return (
        <TextMessage
          textClass={classes.replyText}
          numberOfLines={numberOfLines}
          color={color ? color : null}
          contentClass={classes.contentText}
          bgColor={bgColor}
          members={members}
          text={text}
        />
      )
    }
    return null
  }

  const renderPhoto = () => {
    if (type === CHAT_MESSAGE_TYPE.IMAGE) {
      return (
        <Box className={classes.photoHolder}>
          <Box>
            <Typography variant="body1" className={classes.imgText}>
              {i18n.t('common:chat.reply_img_text')}
            </Typography>
          </Box>
          <PhotoMessage status={true} size={30} msg={text} />
        </Box>
      )
    }
    return null
  }

  const onClick = () => {
    if (type === CHAT_MESSAGE_TYPE.IMAGE || type === CHAT_MESSAGE_TYPE.TEXT) {
      onReplyClick && onReplyClick(replyMessage)
    }
  }

  return (
    <Box className={`${classes.content} ${contentClass ? contentClass : ''}`}>
      <ListItem onClick={onClick} style={{ cursor: 'pointer' }}>
        {isDeleted === false ? (
          <ListItemAvatar className={classes.avatar}>
            <Avatar src={avatar} size={30} alt={nickName} />
          </ListItemAvatar>
        ) : null}
        <ListItemText>
          {showName ? <Typography variant="body2">{nickName}</Typography> : null}
          {renderText()}
        </ListItemText>
      </ListItem>
      {renderPhoto()}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    position: 'relative',
    display: 'block',
  },
  contentText: {
    padding: 0,
    paddingLeft: 0,
    paddingRight: 10,
  },
  imgText: { color: Colors.grey[200], padding: 5, paddingRight: 10 },
  avatar: {
    minWidth: 40,
  },
  replyText: {
    fontSize: 12,
  },
  imgBox: {
    width: 80,
    height: 80,
    borderRadius: 3,
  },
  panelStyle: {
    paddingRight: 20,
  },
  photoHolder: {
    top: 10,
    display: 'flex',
    flexDirection: 'row',
    transform: 'none',
    position: 'absolute',
    right: 20,
    left: 50,
    justifyContent: 'space-between',
    borderRadius: 3,
    overflow: 'hidden',
  },
}))

ReplyContent.defaultProps = {
  showName: true,
  numberOfLines: 1,
}

export default ReplyContent
