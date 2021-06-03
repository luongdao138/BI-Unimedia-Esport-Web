import React from 'react'
import { Box, makeStyles, Divider } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { ChatRoomMemberItem, ChatSuggestionList, MessageType } from '../types/chat.types'
import { TextMessage, PhotoMessage } from '../elements'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import _ from 'lodash'
import ReplyContent from './ReplyContent'

export interface BubbleProps {
  direction: 'left' | 'right'
  currentMessage?: MessageType
  users: ChatRoomMemberItem[] | ChatSuggestionList[]
  navigateToProfile?: (id: string) => void
  onLoadImage: () => void
}

const Bubble: React.FC<BubbleProps> = (props) => {
  const { users, currentMessage, navigateToProfile, direction } = props

  const classes = useStyles({ direction })

  const msg = _.get(currentMessage, 'msg', '')
  const status = _.get(currentMessage, 'sent', false)

  const renderMessageText = () => {
    if (currentMessage.type === CHAT_MESSAGE_TYPE.TEXT) {
      return (
        <TextMessage
          color={direction === 'left' ? Colors.text[200] : Colors.text[400]}
          text={msg}
          members={users}
          navigateToProfile={navigateToProfile}
        />
      )
    }
    return null
  }

  const renderReplyContent = () => {
    if (currentMessage.parentMsg !== null && currentMessage && currentMessage.parentMsg) {
      return (
        <>
          <ReplyContent
            contentClass={classes.replyContent}
            color={direction === 'left' ? Colors.text[200] : Colors.grey[200]}
            showName={false}
            numberOfLines={2}
            replyMessage={currentMessage.parentMsg}
            bgColor={direction === 'left' ? Colors.grey[200] : Colors.white}
          />
          <Divider className={classes.divider} />
        </>
      )
    }
    return null
  }

  const renderMessageImage = () => {
    if (props.currentMessage.type === CHAT_MESSAGE_TYPE.IMAGE) {
      return <PhotoMessage status={status} onLoadImage={props.onLoadImage} msg={msg} />
    }
    return null
  }

  return (
    <Box className={classes.bubble}>
      {renderReplyContent()}
      {renderMessageText()}
      {renderMessageImage()}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down('xs')]: {
    bubble: {
      width: '200px !important',
    },
  },
  bubble: (props: { direction: string }) => {
    return {
      width: 290,
      borderRadius: 16,
      textAlign: 'left',
      overflow: 'hidden',
      background: props.direction === 'left' ? Colors.grey[200] : Colors.white,
      borderBottomLeftRadius: props.direction === 'left' ? 0 : 16,
      borderBottomRightRadius: props.direction === 'left' ? 16 : 0,
    }
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  replyContent: {
    padding: 0,
  },
}))

export default Bubble
