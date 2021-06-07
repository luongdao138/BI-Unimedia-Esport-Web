import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationBadgeItem from './notificationBadgeItem'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import { useRouter } from 'next/router'
import useNotificationDetail from '@containers/Notifications/useNotificationDetail'
import { ESRoutes } from '@constants/route.constants'

const NotificationBadgeListContainer: React.FC = () => {
  const { badgeNotifications, fetchBadgeNotifications, seenNotificationBadge } = useNotificationList()
  const router = useRouter()
  const { fetchNotificationDetail } = useNotificationDetail()

  useEffect(() => {
    fetchBadgeNotifications()
  }, [])

  const handleClick = (notification) => {
    if (notification.attributes) {
      switch (notification.attributes.ntype_id) {
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_FOLLOW: {
          seenNotificationBadge()
          fetchNotificationDetail(Number(notification.id))
          router.push(`${ESRoutes.PROFILE}/${notification.attributes.user_code}`)
          break
        }
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_SYSTEM: {
          seenNotificationBadge()
          router.push(`${ESRoutes.NOTIFICATIONS}/${notification.id}`)
          break
        }
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_ADMIN: {
          seenNotificationBadge()
          router.push(`${ESRoutes.NOTIFICATIONS}/${notification.id}`)
          break
        }
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_TOURNAMENT: {
          seenNotificationBadge()
          router.push(`${ESRoutes.ARENA_DETAIL.replace(/:id/gi, notification.attributes.hash_key)}`)
          break
        }
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_MESSAGE: {
          seenNotificationBadge()
          router.push(`${ESRoutes.GROUP_CHAT.replace(/:id/gi, notification.attributes.room_id)}`)
          break
        }
        default: {
          break
        }
      }
    }
  }

  return (
    <div>
      {badgeNotifications.map((notification, i) => (
        <Grid
          item
          xs={12}
          key={i}
          onClick={() => {
            handleClick(notification)
          }}
        >
          <NotificationBadgeItem data={notification} />
        </Grid>
      ))}
    </div>
  )
}

export default NotificationBadgeListContainer
