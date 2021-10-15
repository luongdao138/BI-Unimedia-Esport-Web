import React, { useEffect } from 'react'
import useNotificationList from './useNotificationList'
import NotificationBadgeItem from './notificationBadgeItem'
import NOTIFICATION_ACTION_TYPES from '@store/notification/actions/types'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const NotificationBadgeListContainer: React.FC = () => {
  const { badgeNotifications, fetchBadgeNotifications, seenNotificationBadge } = useNotificationList()
  const router = useRouter()

  useEffect(() => {
    fetchBadgeNotifications()
  }, [])

  const handleClick = (notification) => {
    if (notification.attributes) {
      switch (notification.attributes.ntype_id) {
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_FOLLOW: {
          seenNotificationBadge()
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
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_RECRUITMENT: {
          seenNotificationBadge()
          router.push(`${ESRoutes.LOBBY_DETAIL.replace(/:id/gi, notification.attributes.hash_key)}`)
          break
        }
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_COMMUNITY: {
          seenNotificationBadge()
          router.push(`${ESRoutes.COMMUNITY_DETAIL.replace(/:id/gi, notification.attributes.hash_key)}`)
          break
        }
        case NOTIFICATION_ACTION_TYPES.NOTIFICATION_TYPE_COMMENT: {
          seenNotificationBadge()
          router.push(`${ESRoutes.TOPIC.replace(/:id/gi, notification.attributes.hash_key)}/${notification.attributes.hash_key2}`)
          break
        }
        default: {
          break
        }
      }
    }
  }

  return (
    <>
      {badgeNotifications.map((notification, i) => (
        <NotificationBadgeItem
          key={i}
          data={notification}
          onClick={() => {
            handleClick(notification)
          }}
        />
      ))}
    </>
  )
}

export default NotificationBadgeListContainer
