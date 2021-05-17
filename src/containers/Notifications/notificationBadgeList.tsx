import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationListItem from './notificationItem'

const NotificationBadgeListContainer: React.FC = () => {
  const { notifications, fetchNotifications } = useNotificationList()
  useEffect(() => {
    const params = { page: 1 }
    fetchNotifications(params)
  }, [])

  return (
    <div>
      {notifications.map((notification, i) => (
        <Grid item xs={12} key={i}>
          <NotificationListItem data={notification} />
        </Grid>
      ))}
    </div>
  )
}

export default NotificationBadgeListContainer
