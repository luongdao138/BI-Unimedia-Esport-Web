import { Grid } from '@material-ui/core'
import { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'
const NotificationContainer: React.FC = () => {
  const { notifications, fetchNotifications } = useNotificationList()
  useEffect(() => {
    fetchNotifications({ page: 1 })
  }, [])
  return (
    <>
      {notifications.map((notification, i) => (
        <Grid item xs={12} key={i}>
          <NotificationListItem data={notification} />
        </Grid>
      ))}
    </>
  )
}
export default NotificationContainer
