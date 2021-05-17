import { Typography, Box, Theme, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ESAvatar from '@components/Avatar'
import useSmartTime from '@utils/hooks/useSmartTime'
interface Props {
  data: any
}

const NotificationBadgeItem: React.FC<Props> = ({ data }) => {
  const notification = data.attributes
  const classes = useStyles()
  return (
    <Box margin={2} display="flex" justifyContent="space-between">
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
              {useSmartTime(notification.created_at)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  notificationWrap: {
    width: '100%',
    padding: theme.spacing(1),
    // background: Colors.black_opacity[80],
    borderRadius: '6px',
    // border: '1px solid rgba(255, 255, 255, 0.3)',
  },
}))

export default NotificationBadgeItem
