import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import settingsStore from '@store/settings'

const { selectors, actions } = settingsStore

const getMeta = createMetaSelector(actions.getSecuritySettings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSecuritySettings = () => {
  const dispatch = useAppDispatch()
  const securitySettings = useAppSelector(selectors.getSecuritySettings)
  const meta = useAppSelector(getMeta)
  const fetchSecuritySettings = () => dispatch(actions.getSecuritySettings())
  const resetMeta = () => dispatch(clearMetaData(actions.getSecuritySettings.typePrefix))
  return { securitySettings, fetchSecuritySettings, resetMeta, meta }
}

export default useSecuritySettings
