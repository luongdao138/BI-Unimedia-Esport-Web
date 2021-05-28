import React from 'react'
import { Typography, Box, makeStyles, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import Avatar from '@components/Avatar/'
import { MessageType } from '../types/chat.types'
import _ from 'lodash'
import TextMessage from './TextMessage'

export interface ReplyContentProps {
  replyMessage: MessageType
  members: any
  color: string
}

const ReplyContent: React.FC<ReplyContentProps> = (props) => {
  const { replyMessage, members, color } = props
  const classes = useStyles()

  const text = _.get(replyMessage, 'msg', '')

  const userData = _.find(members, function (o) {
    return o.userId === replyMessage.userId
  })

  const avatar = _.get(userData, 'profile', '')
  const nickName = _.get(userData, 'nickName', '')

  return (
    <Box className={classes.content}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={avatar} size={30} alt={nickName} />
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="body2">{nickName}</Typography>
          <TextMessage numberOfLines={1} color={color ? color : null} contentClass={classes.contentText} members={members} text={text} />
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
    paddingRight: 0,
  },
}))

ReplyContent.defaultProps = {}

export default ReplyContent
