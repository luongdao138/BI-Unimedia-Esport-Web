import { useAppDispatch, useAppSelector } from '@store/hooks'
import notificationStore from '@store/notification'

const { selectors, actions } = notificationStore

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNotificationDetail = () => {
  const dispatch = useAppDispatch()
  const notificationDetail = useAppSelector(selectors.getNotificationDetail)
  const clearNotificationDetail = () => dispatch(actions.clearNotificationDetail())
  const fetchNotificationDetail = (id: number) => dispatch(actions.getNotificationDetail(id))
  return { notificationDetail, fetchNotificationDetail, clearNotificationDetail }
}

export default useNotificationDetail
