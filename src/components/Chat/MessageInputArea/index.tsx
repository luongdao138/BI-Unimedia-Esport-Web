/* eslint-disable no-console */

import { useState, useMemo, ReactNode } from 'react'
import { Box, Icon, IconButton, makeStyles } from '@material-ui/core'
import Composer from '../Composer'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Colors } from '@theme/colors'
import { ChatSuggestionList } from '../types/chat.types'
import { parseValue } from '../utils'
import { regex } from '../constants'
import useAvailable from '../utils/useAvailable'
import SuggestionListItem from '../elements/SuggestionListItem'

export interface MessageInputAreaProps {
  onPressActionButton?: () => void
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
  const { onPressSend, users } = props
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

  return (
    <Box>
      <Box className={classes.input}>
        <Composer
          renderSuggestion={renderSuggestion}
          users={users}
          placeholder={t('common:chat.placeholder')}
          msg={text}
          onChange={onChangeText}
        />
        <IconButton disabled={_.isEmpty(text) ? true : false} className={classes.send} onClick={send} disableRipple>
          <Icon className={`${classes.icon} fas fa-paper-plane`} />
        </IconButton>
      </Box>
    </Box>
  )
}

MessageInputArea.defaultProps = {}

const useStyles = makeStyles(() => ({
  input: {
    position: 'relative',
  },
  send: {
    position: 'absolute',
    right: 9,
    top: '50%',
    transform: 'translateY(-50%)',
    '&:hover': {
      background: 'none',
    },
    '&:focus $icon, &:active $icon': {
      color: Colors.text[200],
    },
  },
  icon: {
    fontSize: 14,
  },
}))

export default MessageInputArea
