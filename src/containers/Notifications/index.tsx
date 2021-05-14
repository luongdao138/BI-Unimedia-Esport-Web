import { useEffect } from 'react'
import useNotificationList from './useNotificationList'
const NotificationContainer: React.FC = () => {
  const { notifications, fetchNotifications } = useNotificationList()
  useEffect(() => {
    fetchNotifications({ page: 1 })
  }, [])
  return (
    <>
      {notifications.map((notification, i) => (
        <span key={i}>{notification.attributes.nickname}</span>
      ))}
    </>
  )
}
export default NotificationContainer
