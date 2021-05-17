import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationBadgeItem from './notificationBadgeItem'

const NotificationBadgeListContainer: React.FC = () => {
  const { notifications, fetchNotifications } = useNotificationList()
  useEffect(() => {
    const params = { page: 1 }
    fetchNotifications(params)
  }, [])

  return (
    <div>
      {notifications.slice(0, 5).map((notification, i) => (
        <Grid item xs={12} key={i}>
          <NotificationBadgeItem data={notification} />
        </Grid>
      ))}
    </div>
  )
}

export default NotificationBadgeListContainer
