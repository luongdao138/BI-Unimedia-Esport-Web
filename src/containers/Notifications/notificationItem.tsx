import { Typography, Box, Theme, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ESAvatar from '@components/Avatar'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import _ from 'lodash'
interface Props {
  data: any
}

const NotificationListItem: React.FC<Props> = ({ data }) => {
  const notification = data.attributes
  const classes = useStyles()
  const createdAt = CommonHelper.staticSmartTime(_.get(notification, 'created_at', ''))
  return (
    <Box className={classes.wrap}>
      <Box display="flex" overflow="hidden" className={classes.notificationWrap}>
        <ESAvatar alt={notification.nickname} src={notification.avatar_url} />
        <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center" width="100%">
          <Box color={Colors.white}>
            <Typography variant="caption" noWrap>
              {notification.nickname}
            </Typography>
          </Box>
          <Typography noWrap>{notification.message}</Typography>
          <Box textAlign="right">
            <Typography variant="caption" noWrap>
              {createdAt}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    margin: theme.spacing(2),
    marginBottom: 0,
  },
  notificationWrap: {
    width: '100%',
    padding: theme.spacing(2),
    background: Colors.black_opacity[80],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
}))

export default NotificationListItem
