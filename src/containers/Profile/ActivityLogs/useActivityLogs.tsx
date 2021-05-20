import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'
import { ActivityLogParams } from '@services/user.service'

const { selectors, actions } = userProfile
const getActivityLogsMeta = createMetaSelector(actions.getActivityLogs)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useActivityLogs = () => {
  const dispatch = useAppDispatch()
  const activityLogs = useAppSelector(selectors.getActivityLogs)
  const pages = useAppSelector(selectors.getActivityLogsMeta)
  // const page = useAppSelector(selectors.getTourHistoriesMeta)
  const meta = useAppSelector(getActivityLogsMeta)
  const getActivityLogs = (param: ActivityLogParams) => dispatch(actions.getActivityLogs(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getActivityLogs.typePrefix))
  return { activityLogs, getActivityLogs, resetMeta, meta, pages }
}

export default useActivityLogs
