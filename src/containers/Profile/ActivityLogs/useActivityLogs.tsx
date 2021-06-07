import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'
import { ActivityLogParams, ActivityLog, Meta as Page } from '@services/user.service'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = userProfile
const getActivityLogsMeta = createMetaSelector(actions.getActivityLogs)

const useActivityLogs = (): {
  activityLogs: Array<ActivityLog>
  getActivityLogs: (param: ActivityLogParams) => void
  resetMeta: () => void
  meta: Meta
  pages: Page
} => {
  const dispatch = useAppDispatch()
  const activityLogs = useAppSelector(selectors.getActivityLogs)
  const pages = useAppSelector(selectors.getActivityLogsMeta)
  const meta = useAppSelector(getActivityLogsMeta)
  const getActivityLogs = (param: ActivityLogParams) => dispatch(actions.getActivityLogs(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getActivityLogs.typePrefix))
  return { activityLogs, getActivityLogs, resetMeta, meta, pages }
}

export default useActivityLogs
