import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import notificationStore from '@store/notification'
import { NotificationListParams } from '@services/notification.service'

const { selectors, actions } = notificationStore
const getUserSearchMeta = createMetaSelector(actions.notifications)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNotificationList = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectors.getNotificationList)
  const page = useAppSelector(selectors.getNotificationListMeta)
  const meta = useAppSelector(getUserSearchMeta)
  const fetchNotifications = (param: NotificationListParams) => dispatch(actions.notifications(param))
  const resetMeta = () => dispatch(clearMetaData(actions.notifications.typePrefix))
  return { notifications, fetchNotifications, resetMeta, meta, page }
}

export default useNotificationList
