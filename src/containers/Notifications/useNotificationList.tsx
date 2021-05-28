import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import notificationStore from '@store/notification'
import { NotificationListParams } from '@services/notification.service'

const { selectors, actions } = notificationStore
const getNotificationsMeta = createMetaSelector(actions.getNotifications)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNotificationList = () => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectors.getNotificationList)
  const pages = useAppSelector(selectors.getNotificationListMeta)
  const meta = useAppSelector(getNotificationsMeta)
  const fetchNotifications = (param: NotificationListParams) => dispatch(actions.getNotifications(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getNotifications.typePrefix))
  return { notifications, fetchNotifications, resetMeta, meta, pages }
}

export default useNotificationList
