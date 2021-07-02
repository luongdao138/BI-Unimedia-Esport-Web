import React, { useMemo, ReactNode, Ref, useImperativeHandle, useState, forwardRef } from 'react'
import { Box, Icon, IconButton, makeStyles } from '@material-ui/core'
import Composer from '@components/Chat/Composer'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Colors } from '@theme/colors'
import { ChatRoomMemberItem, ChatSuggestionList } from '../types/chat.types'
import { parseValue } from '@components/Chat/utils'
import { regex } from '../constants'
import useAvailable from '@components/Chat/utils/useAvailable'
import { Actions, SuggestionListItem } from '@components/Chat/elements'
import { MentionItem } from 'react-mentions'

export interface ClearInputrRef {
  clearInput: () => void
}

export interface MessageInputAreaProps {
  onPressActionButton?: (type: number) => void
  users: ChatSuggestionList[] | ChatRoomMemberItem[]
  onPressSend?: (text: string) => void
  text?: string | null
  handleOnPressActions?: ((type: number) => void) | undefined
  disabled?: boolean
  onCancelReply?: () => void
  currentUser?: string | number
  ref: Ref<ClearInputrRef>
  isBlocked?: boolean
}

const partTypes = [
  {
    trigger: '@',
  },
  {
    pattern: regex.url,
  },
]

const MessageInputArea: React.FC<MessageInputAreaProps> = forwardRef<ClearInputrRef, MessageInputAreaProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    clearInput: () => {
      setText('')
    },
  }))
  const { onPressSend, users, onPressActionButton, disabled, currentUser, isBlocked } = props

  const [text, setText] = useState<string>('')

  const { parts } = useMemo(() => parseValue(text, partTypes), [text, partTypes])

  const { selected, userData } = useAvailable(users, parts, currentUser)

  const classes = useStyles()

  const { t } = useTranslation(['common'])

  const onChangeText = (_event: { target: { value: string } }, newValue: string, _newPlainTextValue: string, _mentions: MentionItem[]) => {
    setText(newValue)
  }

  const send = (e: React.MouseEvent) => {
    onPressSend ? onPressSend(text.trim()) : undefined
    e.preventDefault()
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

  const handleKeyPress = (_evt: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => {
    // if (evt.key === 'Enter' && evt.shiftKey === false) {
    //   onPressSend ? onPressSend(text.trim()) : undefined
    //   evt.preventDefault()
    //   setText('')
    // }
  }

  return (
    <>
      <Box className={classes.root}>
        <Actions onPressActions={onPressActionButton} disabled={disabled || isBlocked} />
        <Box className={classes.input}>
          <Composer
            renderSuggestion={renderSuggestion}
            users={userData}
            placeholder={t('common:chat.placeholder')}
            msg={text}
            onKeyPress={handleKeyPress}
            onChange={onChangeText}
          />
        </Box>
        <IconButton
          disabled={disabled === true || _.isEmpty(text.trim()) || isBlocked ? true : false}
          className={classes.send}
          onClick={send}
          disableRipple
        >
          <Icon className={`${classes.icon} fas fa-paper-plane`} />
        </IconButton>
      </Box>
    </>
  )
})

MessageInputArea.defaultProps = {
  isBlocked: false,
}

const useStyles = makeStyles(() => ({
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

export default React.memo(MessageInputArea)
