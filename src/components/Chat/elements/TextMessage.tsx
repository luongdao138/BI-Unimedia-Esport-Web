import React from 'react'
import { parseValue } from '@components/Chat/utils'
import { MentionData, PartRender } from '@components/Chat/types/mention.type'
import { Typography, Box, makeStyles } from '@material-ui/core'
import { regex } from '@components/Chat/constants'
import { ChatRoomMemberItem } from '../types/chat.types'
import _ from 'lodash'
import { Colors } from '@theme/colors'

export interface MessageTextProps {
  text: string
  navigateToProfile?: (id: string) => void
  numberOfLines?: number
  members: ChatRoomMemberItem[]
  color?: string
}

const TextMessage: React.FC<MessageTextProps> = (props) => {
  const { text, navigateToProfile, members, color } = props
  const classes = useStyles()

  const partTypes = [
    {
      trigger: '@',
    },
    {
      pattern: regex.url,
    },
  ]

  const onPressProfile = (data: MentionData) => {
    if (data && data.userId) {
      navigateToProfile && navigateToProfile(data.userId)
    }
  }

  const onPressLink = (_link: string) => {
    ///
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
        <Typography
          noWrap={false}
          variant="body1"
          onClick={() => onPressProfile(data)}
          key={`${index}-${data?.trigger ?? 'pattern'}`}
          className={classes.mention}
        >
          {'@' + name}
        </Typography>
      )
    } else if (partType && partType.pattern === regex.url) {
      return (
        <Typography
          noWrap={false}
          variant="body1"
          onClick={() => onPressLink(text)}
          key={`${index}-${data?.trigger ?? 'pattern'}`}
          className={classes.url}
        >
          {text}
        </Typography>
      )
    } else {
      return (
        <Typography
          style={{ color: color }}
          noWrap={false}
          variant="body1"
          key={`${index}-${data?.trigger ?? 'pattern'}`}
          className={classes.plain}
        >
          {text}
        </Typography>
      )
    }
  }

  const { parts } = parseValue(text, partTypes)
  return (
    <Box className={classes.content}>{parts.map(({ text, partType, data }, index) => renderPart({ text, partType, data, index }))}</Box>
  )
}

const useStyles = makeStyles(() => ({
  content: {
    padding: 8,
  },
  mention: {
    color: Colors.primary,
    cursor: 'pointer',
    fontWeight: 400,
    wordBreak: 'break-all',
  },
  url: {
    color: Colors.secondary,
    cursor: 'pointer',
    wordBreak: 'break-all',
  },
  plain: {
    color: Colors.grey[100],
    wordBreak: 'break-all',
  },
}))

TextMessage.defaultProps = {
  numberOfLines: 0,
  color: Colors.black,
}

export default TextMessage
