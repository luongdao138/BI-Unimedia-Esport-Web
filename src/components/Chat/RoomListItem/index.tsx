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
import { CHAT_ROOM_TYPE } from '@constants/socket.constants'
import Icon from '@material-ui/core/Icon'
import { AVATAR_PATH } from '@constants/common.constants'

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
  const date = _.get(item, 'lastMsgAt', 0)
  const roomImg = _.get(item, 'roomImg', '')
  const name = _.get(item, 'roomName', '')
  const lastMsg = _.get(item, 'lastMsg', '')
  const unseenCount = _.get(item, 'unseenCount', 0)
  const groupType = _.get(item, 'groupType', 0)

  const classes = useStyles({ active, expand })

  const time = date === 0 ? '' : CommonHelper.staticSmartTime(date)
  const chatRoomId = _.get(item, 'chatRoomId', null)

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (chatRoomId && onClick) {
      onClick(chatRoomId)
    }
  }

  const renderIcon = () => {
    if (groupType === CHAT_ROOM_TYPE.TOURNAMENT) {
      return <Icon className={`${classes.smallIcon} fas fa-trophy`}></Icon>
    } else if (groupType === CHAT_ROOM_TYPE.RECRUITMENT) {
      return <Icon className={`${classes.smallIcon} fas fa-university`}></Icon>
    }
    return null
  }

  const getRoomImg = () => {
    if (
      (!_.isString(roomImg) && groupType !== CHAT_ROOM_TYPE.CHAT_DIRECT) ||
      (_.isEmpty(roomImg) && groupType !== CHAT_ROOM_TYPE.CHAT_DIRECT)
    )
      return AVATAR_PATH
    return roomImg
  }

  return (
    <ListItem className={classes.root} selected={selected} onClick={clickHandler}>
      <ListItemAvatar className={classes.avatarItem}>
        <>
          {renderIcon()}
          <Badge
            className={classes.badgeLeft}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            color="primary"
            overlap="circle"
            badgeContent={unseenCount}
            showZero={false}
          >
            <Avatar src={getRoomImg()} alt={name}>
              <img className="MuiAvatar-img" src={getRoomImg()} />
            </Avatar>
          </Badge>
        </>
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
const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'flex-start',
    cursor: 'pointer',
    height: 70,
    paddingLeft: 5,
    paddingTop: 10,
    '&:hover': {
      background: (props: StyleProps) => (props.expand ? 'rgba(255,255,255, 0.1)' : 'inherit'),
      transition: 'all 0.2s ease',
    },
  },

  name: {
    color: (props: StyleProps) => (props.active ? Colors.white : Colors.text[200]),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  body: {
    color: (props: StyleProps) => (props.active ? Colors.white : Colors.text[200]),
    fontWeight: (props: StyleProps) => (props.active ? 600 : 500),
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
  avatarItem: {
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 10,
  },
  smallIcon: {
    position: 'absolute',
    fontSize: 9,
    color: Colors.text[200],
    top: 0,
    left: 0,
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      '&.Mui-selected': {
        backgroundColor: 'transparent',
      },
    },
  },
}))

RoomListItem.defaultProps = {
  selected: false,
}

export default RoomListItem
