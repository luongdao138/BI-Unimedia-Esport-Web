import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import notificationStore from '@store/notification'

const { selectors, actions } = notificationStore
const getNotificationMeta = createMetaSelector(actions.getNotifications)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNotificationList = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectors.getNotificationList)
  const page = useAppSelector(selectors.getNotificationListMeta)
  const meta = useAppSelector(getNotificationMeta)
  const fetchNotifications = () => dispatch(actions.getNotificationBadge)
  const resetMeta = () => dispatch(clearMetaData(actions.getNotifications.typePrefix))
  return { notifications, fetchNotifications, resetMeta, meta, page }
}

export default useNotificationList
