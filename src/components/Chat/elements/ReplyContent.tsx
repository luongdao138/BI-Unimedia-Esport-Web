import React from 'react'
import { Typography, Box, makeStyles, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Avatar from '@components/Avatar/'
import { MessageType, ParentItem } from '../types/chat.types'
import _ from 'lodash'
import TextMessage from './TextMessage'

export interface ReplyContentProps {
  replyMessage: null | ParentItem | string | MessageType
  members?: any
  color: string
  showName?: boolean
  contentClass?: string
  numberOfLines?: number
}

const ReplyContent: React.FC<ReplyContentProps> = (props) => {
  const { replyMessage, members, color, showName, contentClass, numberOfLines } = props
  const classes = useStyles()

  const text = _.get(replyMessage, 'msg', '')

  const userData = members
    ? _.find(members, function (o) {
        return o.userId === _.get(replyMessage, 'userId', null)
      })
    : []

  const avatar = _.get(userData, 'profile', '')
  const nickName = _.get(userData, 'nickName', '')
  const isDeleted = _.get(replyMessage, 'isDeleted', false)

  return (
    <Box className={`${classes.content} ${contentClass ? contentClass : ''}`}>
      <ListItem>
        {isDeleted === false ? (
          <ListItemAvatar className={classes.avatar}>
            <Avatar src={avatar} size={30} alt={nickName} />
          </ListItemAvatar>
        ) : null}
        <ListItemText>
          {showName ? <Typography variant="body2">{nickName}</Typography> : null}
          <TextMessage
            textClass={classes.replyText}
            numberOfLines={numberOfLines}
            color={color ? color : null}
            contentClass={classes.contentText}
            members={members}
            text={text}
          />
        </ListItemText>
      </ListItem>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  content: {
    width: '100%',
    display: 'block',
  },
  contentText: {
    padding: 0,
    paddingLeft: 0,
    paddingRight: 10,
  },
  avatar: {
    minWidth: 40,
  },
  replyText: {
    fontSize: 12,
  },
}))

ReplyContent.defaultProps = {
  showName: true,
  numberOfLines: 1,
}

export default ReplyContent
