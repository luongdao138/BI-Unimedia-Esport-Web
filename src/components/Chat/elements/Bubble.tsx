import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { ChatRoomMemberItem, MessageType } from '../types/chat.types'
import { TextMessage, PhotoMessage } from '../elements'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import _ from 'lodash'

export interface BubbleProps {
  direction: 'left' | 'right'
  currentMessage?: MessageType
  users: ChatRoomMemberItem[]
  navigateToProfile?: (id: string) => void
  onLoadImage: () => void
}

const Bubble: React.FC<BubbleProps> = (props) => {
  const { users, currentMessage, navigateToProfile, direction } = props

  const classes = useStyles({ direction })

  const msg = _.get(currentMessage, 'msg', '')

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

  const renderMessageImage = () => {
    if (props.currentMessage.type === CHAT_MESSAGE_TYPE.IMAGE) {
      return <PhotoMessage onLoadImage={props.onLoadImage} msg={msg} />
    }
    return null
  }

  return (
    <Box className={classes.bubble}>
      {renderMessageText()}
      {renderMessageImage()}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
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
}))

export default Bubble
