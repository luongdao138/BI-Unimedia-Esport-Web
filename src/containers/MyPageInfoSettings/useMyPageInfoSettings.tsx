import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import settingsStore from '@store/settings'
import { useEffect } from 'react'
import { SecuritySettingsParam } from '@services/settings.service'

const { selectors, actions } = settingsStore

const getMeta = createMetaSelector(actions.getSecuritySettings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSecuritySettings = () => {
  const dispatch = useAppDispatch()
  const securitySettings = useAppSelector(selectors.getSecuritySettings)
  const fetchMeta = useAppSelector(getMeta)
  const fetchSecuritySettings = () => dispatch(actions.getSecuritySettings())
  const resetMeta = () => dispatch(clearMetaData(actions.getSecuritySettings.typePrefix))
  const updateMeta = useAppSelector(getMeta)
  const updateSecuritySettings = (param: SecuritySettingsParam) => dispatch(actions.updateSecuritySettings(param))

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.updateSecuritySettings.typePrefix))
    }
  }, [])
  useEffect(() => {
    fetchSecuritySettings()
  }, [])
  return { securitySettings, updateMeta, updateSecuritySettings, resetMeta, fetchMeta }
}

export default useSecuritySettings
