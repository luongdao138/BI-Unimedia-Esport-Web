import { Typography, Box, Theme, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ESAvatar from '@components/Avatar'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'

interface Props {
  data: any
}

const NotificationBadgeItem: React.FC<Props> = ({ data }) => {
  const notification = data.attributes
  const classes = useStyles()
  return (
    <Box margin={2} display="flex" justifyContent="space-between">
      <Box display="flex" overflow="hidden" className={classes.notificationWrap}>
        {notification.ntype_id === NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_FOLLOW ? (
          <ESAvatar alt={notification.nickname} src={notification.avatar_url} />
        ) : (
          <ESAvatar src={notification.avatar_url || '/images/avatar.png'} />
        )}
        <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center" width="100%">
          <Typography variant="caption" noWrap className={classes.title}>
            {notification.nickname}
          </Typography>
          <Typography noWrap>{notification.message}</Typography>
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
    maxWidth: 370,
    cursor: 'pointer',
    width: '100%',
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
}))

export default NotificationBadgeItem
