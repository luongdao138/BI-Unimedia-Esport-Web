import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@components/Avatar'
import Typography from '@material-ui/core/Typography'
import { ChatDataType } from '@components/Chat/types/chat.types'
import _ from 'lodash'
import Box from '@material-ui/core/Box'
import { Colors } from '@theme/colors'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import Badge from '@material-ui/core/Badge'
import 'moment/locale/ja'
import i18n from '@locales/i18n'

interface RoomListItemProps {
  expand?: boolean
  item: ChatDataType
  selected?: boolean
  onClick?: (id: string) => void
}

interface StyleProps {
  active: boolean
  expand: boolean
}

const RoomListItem: React.FC<RoomListItemProps> = ({ expand, item, selected, onClick }) => {
  const active = item.unseenCount === 0 ? false : true
  const date = _.get(item, 'lastMsgAt', +item.createdAt)
  const roomImg = _.get(item, 'roomImg', '')
  const name = _.get(item, 'roomName', '')
  const lastMsg = _.get(item, 'lastMsg', '')
  const unseenCount = _.get(item, 'unseenCount', 0)

  const classes = useStyles({ active, expand })

  const time = CommonHelper.staticSmartTime(date)
  const chatRoomId = _.get(item, 'chatRoomId', null)

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (chatRoomId && onClick) {
      onClick(chatRoomId)
    }
  }

  return (
    <ListItem className={classes.root} selected={selected} onClick={clickHandler}>
      <ListItemAvatar>
        <Badge
          className={classes.badgeLeft}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="primary"
          overlap="circle"
          badgeContent={unseenCount}
          showZero={false}
        >
          <Avatar src={roomImg} alt={name} />
        </Badge>
      </ListItemAvatar>

      <ListItemText className={classes.content}>
        <Typography noWrap={true} className={classes.name} variant="body2">
          {name}
        </Typography>
        <Typography noWrap={true} className={classes.body} variant="body1">
          {CommonHelper.isMediaURL(lastMsg) ? i18n.t('common:chat.uploaded_image') : lastMsg}
        </Typography>
      </ListItemText>

      <ListItemSecondaryAction className={classes.end}>
        <Badge className={classes.badgeRight} color="primary" overlap="circle" badgeContent={unseenCount} showZero={false}>
          <Box className={classes.countBox}></Box>
        </Badge>
        <Typography variant="body2" className={classes.time}>
          {time}
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'flex-start',
    cursor: 'pointer',
  },

  name: {
    color: (props: StyleProps) => (props.active ? Colors.white : Colors.text[200]),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  body: {
    color: (props: StyleProps) => (props.active ? Colors.white : Colors.text[200]),
    fontWeight: (props) => (props.active ? 600 : 500),
  },

  content: {
    display: 'inline-block',
    visibility: (props: StyleProps) => (props.expand ? 'visible' : 'hidden'),
    opacity: (props: StyleProps) => (props.expand ? '1' : '0'),
    marginTop: 0,
    width: '100%',
  },

  end: {
    display: (props: StyleProps) => (props.expand ? 'flex' : 'none'),
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    transform: 'none',
    paddingTop: 10,
    paddingBottom: 10,
  },
  countBox: {
    marginBottom: 10,
    width: 25,
    height: 25,
  },
  time: {
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  badgeRight: {
    '& .MuiBadge-badge': {
      top: 0,
      right: 0,
      transform: 'none',
    },
    '& .MuiBadge-invisible': {
      opacity: 0,
      visiblity: 'hidden',
    },
  },
  badgeLeft: {
    '& .MuiBadge-badge': {
      opacity: (props: StyleProps) => (props.expand ? 0 : 1),
    },
  },
}))

RoomListItem.defaultProps = {
  selected: false,
}

export default memo(RoomListItem)
