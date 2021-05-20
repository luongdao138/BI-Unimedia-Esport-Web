/* eslint-disable no-console */

import { useState, useMemo, ReactNode } from 'react'
import { Box, Icon, IconButton, makeStyles } from '@material-ui/core'
import Composer from '@components/Chat/Composer'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Colors } from '@theme/colors'
import { ChatSuggestionList } from '../types/chat.types'
import { parseValue } from '@components/Chat/utils'
import { regex } from '../constants'
import useAvailable from '@components/Chat/utils/useAvailable'
import { Actions, SuggestionListItem } from '@components/Chat/elements'

export interface MessageInputAreaProps {
  onPressActionButton?: (type: number) => void
  users: ChatSuggestionList[]
  onPressSend?: (text: string) => void
  text?: string | null
  handleOnPressActions?: ((type: number) => void) | undefined
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
  const { onPressSend, users, onPressActionButton } = props
  const [text, setText] = useState<string>('')

  const { parts } = useMemo(() => parseValue(text, partTypes), [text, partTypes])

  const selected = useAvailable(users, parts)

  const classes = useStyles()

  const { t } = useTranslation(['common'])

  const onChangeText = (text: string) => {
    setText(text)
  }

  const send = () => {
    onPressSend ? onPressSend(text) : undefined
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
      console.log('im here')
      evt.preventDefault()
      onPressSend ? onPressSend(text) : undefined
    }
  }

  return (
    <Box className={classes.root}>
      <Actions onPressActions={onPressActionButton} />
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
      <IconButton disabled={_.isEmpty(text) ? true : false} className={classes.send} onClick={send} disableRipple>
        <Icon className={`${classes.icon} fas fa-paper-plane`} />
      </IconButton>
    </Box>
  )
}

MessageInputArea.defaultProps = {}

const useStyles = makeStyles(() => ({
  toolbar: {
    flexDirection: 'row',
    display: 'flex',
  },
  root: {
    flexDirection: 'row',
    display: 'flex',
    flexShrink: 0,
  },
  input: {
    position: 'relative',
    flexGrow: 1,
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
}))

export default MessageInputArea
