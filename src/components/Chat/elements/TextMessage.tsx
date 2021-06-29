import React from 'react'
import { parseValue } from '@components/Chat/utils'
import { MentionData, PartRender } from '@components/Chat/types/mention.type'
import { Typography, Box, makeStyles } from '@material-ui/core'
import { regex } from '@components/Chat/constants'
import { ChatRoomMemberItem, ChatSuggestionList } from '../types/chat.types'
import _ from 'lodash'
import { Colors } from '@theme/colors'

export interface MessageTextProps {
  text: string
  navigateToProfile?: (id: string) => void
  numberOfLines?: number | null
  members: ChatRoomMemberItem[] | ChatSuggestionList[]
  color?: string | null
  contentClass?: string
  textClass?: string
  bgColor?: string
}

const TextMessage: React.FC<MessageTextProps> = (props) => {
  const { text, navigateToProfile, members, color, contentClass, numberOfLines, textClass } = props
  const classes = useStyles(props)

  const partTypes = [
    {
      trigger: '@',
    },
    {
      pattern: regex.url,
    },
  ]

  const onPressProfile = (data: MentionData) => {
    const userCode = _.get(
      _.find(members, function (o) {
        return o.id === data.userId
      }),
      'userCode',
      undefined
    )
    if (userCode) {
      navigateToProfile && navigateToProfile(userCode)
    }
  }

  const renderPart = (partData: PartRender) => {
    const { partType, data, text, index } = partData

    if (partType && partType.trigger === '@') {
      const name = _.get(
        _.find(members, function (o) {
          return o.id === text
        }),
        'nickName',
        ''
      )
      return (
        <span onClick={() => onPressProfile(data)} key={`${index}-${data?.trigger ?? 'pattern'}`} className={classes.mention}>
          {'@' + name}
        </span>
      )
    } else if (partType && partType.pattern === regex.url) {
      return (
        <a href={text} target="_blank" rel="noopener noreferrer" key={`${index}-${data?.trigger ?? 'pattern'}`} className={classes.url}>
          {text}
        </a>
      )
    } else {
      return (
        <span style={color ? { color: color } : null} key={`${index}-${data?.trigger ?? 'pattern'}`} className={classes.plain}>
          {text}
        </span>
      )
    }
  }

  const { parts } = parseValue(text, partTypes)
  return (
    <Box className={`${classes.content}  ${contentClass ? contentClass : ''}`}>
      <Typography
        className={`${textClass ? textClass : ''} ${numberOfLines === 1 ? classes.wrapOne : ''} ${
          numberOfLines > 1 ? classes.multiline : ''
        }`}
        variant="body1"
      >
        {parts.map(({ text, partType, data }, index) => renderPart({ text, partType, data, index }))}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  content: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  mention: {
    color: Colors.primary,
    cursor: 'pointer',
    fontWeight: 400,
    wordBreak: 'break-all',
  },
  url: {
    color: '#8e47ff',
    cursor: 'pointer',
    wordBreak: 'break-all',
  },
  plain: {
    color: Colors.grey[100],
    wordBreak: 'break-all',
  },
  wrapOne: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  multiline: {
    position: 'relative',
    maxHeight: 36,
    overflow: 'hidden',
    paddingRight: '1rem',
    '&:before': {
      position: 'absolute',
      content: "'...'",
      display: 'block',
      color: (props: MessageTextProps) => props.color,
      fontSize: 14,
      bottom: 0,
      right: 0,
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      // insetInlineEnd: 0,
      display: 'block',
      width: '1rem',
      backgroundColor: (props: MessageTextProps) => props.bgColor,
      height: '1rem',
      right: 0,
    },
  },
}))

TextMessage.defaultProps = {
  numberOfLines: null,
  color: Colors.black,
}

export default React.memo(TextMessage)
