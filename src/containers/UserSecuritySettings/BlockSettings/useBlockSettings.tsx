import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import settingsStore from '@store/settings'
import { BlockedUsersParams } from '@services/settings.service'

const { selectors, actions } = settingsStore
const getMeta = createMetaSelector(actions.getBlockedUsers)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useBlockSettings = () => {
  const dispatch = useAppDispatch()
  const blockedUsers = useAppSelector(selectors.getBlockedUsers)
  const page = useAppSelector(selectors.getBlockedUsersMeta)
  const meta = useAppSelector(getMeta)
  const fetchBlockedUsers = (param: BlockedUsersParams) => dispatch(actions.getBlockedUsers(param))
  const clearBlockedUsers = () => dispatch(actions.clearBlockedUsers())
  const resetMeta = () => dispatch(clearMetaData(actions.getBlockedUsers.typePrefix))

  return { clearBlockedUsers, blockedUsers, fetchBlockedUsers, resetMeta, meta, page }
}

export default useBlockSettings
