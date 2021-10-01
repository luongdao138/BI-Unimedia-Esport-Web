import { Typography, Box, Theme, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ESAvatar from '@components/Avatar'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'

interface Props {
  data: any
  onClick: () => void
}

const NotificationBadgeItem: React.FC<Props> = ({ data, onClick }) => {
  const notification = data.attributes
  const classes = useStyles()
  const renderAvatar = () => {
    switch (notification.ntype_id) {
      case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_SYSTEM || NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_ADMIN:
        return <ESAvatar src={'/images/avatar.png'} />
      case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_FOLLOW:
        return <ESAvatar alt={notification.nickname} src={notification.avatar_url} />
      case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_RECRUITMENT:
        return <ESAvatar src={notification.avatar_url || '/images/avatar.png'} />
      default:
        return <ESAvatar src={notification.avatar_url || '/images/avatar.png'} />
    }
  }
  return (
    <Box margin={1} display="flex" justifyContent="space-between" onClick={onClick}>
      <Box display="flex" overflow="hidden" className={classes.notificationWrap}>
        {renderAvatar()}
        <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center" width="100%">
          <Typography variant="caption" noWrap className={classes.title}>
            {notification.nickname}
          </Typography>
          <Typography className={classes.twoLines}>{notification.full_message}</Typography>
          <Box textAlign="right">
            <Typography variant="caption" noWrap>
              {CommonHelper.staticSmartTime(notification.created_at)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  notificationWrap: {
    cursor: 'pointer',
    width: 370,
    padding: theme.spacing(1),
    borderRadius: '6px',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
  title: {
    color: Colors.white,
  },
  twoLines: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    overflow: 'hidden',
    width: '100%',
    maxHeight: 42,
  },
}))

export default NotificationBadgeItem
