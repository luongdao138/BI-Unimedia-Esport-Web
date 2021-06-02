import React, { useState, useMemo, ReactNode } from 'react'
import { Box, Icon, IconButton, makeStyles } from '@material-ui/core'
import Composer from '@components/Chat/Composer'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Colors } from '@theme/colors'
import { ChatRoomMemberItem, ChatSuggestionList, ParentItem, MessageType } from '../types/chat.types'
import { parseValue } from '@components/Chat/utils'
import { regex } from '../constants'
import useAvailable from '@components/Chat/utils/useAvailable'
import { Actions, SuggestionListItem, ReplyContent } from '@components/Chat/elements'
import { MentionItem } from 'react-mentions'

export interface MessageInputAreaProps {
  onPressActionButton?: (type: number) => void
  users: ChatSuggestionList[] | ChatRoomMemberItem[]
  onPressSend?: (text: string) => void
  text?: string | null
  handleOnPressActions?: ((type: number) => void) | undefined
  disabled?: boolean
  onCancelReply?: () => void
  reply?: ParentItem | null | MessageType
}

const partTypes = [
  {
    trigger: '@',
  },
  {
    pattern: regex.url,
  },
]

const MessageInputArea: React.FC<MessageInputAreaProps> = (props) => {
  const { onPressSend, users, onPressActionButton, onCancelReply, reply, disabled } = props
  const [text, setText] = useState<string>('')

  const { parts } = useMemo(() => parseValue(text, partTypes), [text, partTypes])

  const selected = useAvailable(users, parts)

  const classes = useStyles()

  const { t } = useTranslation(['common'])

  const onChangeText = (_event: { target: { value: string } }, newValue: string, _newPlainTextValue: string, _mentions: MentionItem[]) => {
    setText(newValue)
  }

  const send = (e: React.MouseEvent) => {
    onPressSend ? onPressSend(text.trim()) : undefined
    e.preventDefault()
    setText('')
  }

  const renderSuggestion = (
    suggestion: ChatSuggestionList,
    _search: string,
    _highlightedDisplay: ReactNode,
    index: number,
    _focused: boolean
  ) => {
    if (!selected.includes(suggestion.id.toString())) {
      return <SuggestionListItem key={index} item={suggestion} />
    }
  }

  const handleKeyPress = (evt: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && evt.shiftKey === false) {
      onPressSend ? onPressSend(text.trim()) : undefined
      evt.preventDefault()
      setText('')
    }
  }

  const renderReplyPanel = () => {
    if (reply !== null) {
      return (
        <Box className={classes.panel}>
          <ReplyContent color={Colors.text[200]} replyMessage={reply} members={users} />
          <IconButton onClick={onCancelReply} disableRipple className={classes.closeButton}>
            <Icon className={`${classes.iconClose} fa fa-times`} />
          </IconButton>
        </Box>
      )
    }
    return null
  }

  return (
    <>
      {renderReplyPanel()}
      <Box className={classes.root}>
        <Actions onPressActions={onPressActionButton} disabled={disabled} />
        <Box className={classes.input}>
          <Composer
            renderSuggestion={renderSuggestion}
            users={users}
            placeholder={t('common:chat.placeholder')}
            msg={text}
            onKeyPress={handleKeyPress}
            onChange={onChangeText}
          />
        </Box>
        <IconButton disabled={disabled === true || _.isEmpty(text) ? true : false} className={classes.send} onClick={send} disableRipple>
          <Icon className={`${classes.icon} fas fa-paper-plane`} />
        </IconButton>
      </Box>
    </>
  )
}

MessageInputArea.defaultProps = {}

const useStyles = makeStyles(() => ({
  panel: {
    position: 'relative',
    paddingBottom: 10,
    paddingRight: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    zIndex: 100,
    right: 5,
    '&:hover': {
      background: 'transparent',
    },
  },
  iconClose: {
    color: Colors.text[200],
    fontSize: '12px',
  },
  toolbar: {
    flexDirection: 'row',
    display: 'flex',
  },
  root: {
    flexDirection: 'row',
    display: 'flex',
    flexShrink: 0,
    maxWidth: '100%',
  },
  input: {
    position: 'relative',
    flexGrow: 1,
    maxWidth: 533,
    width: '100%',
  },
  send: {
    '&:hover $icon': {
      color: Colors.primary,
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'none',
    },
  },
  icon: {
    fontSize: 14,
  },
  contentText: {
    padding: 0,
  },
}))

export default MessageInputArea
