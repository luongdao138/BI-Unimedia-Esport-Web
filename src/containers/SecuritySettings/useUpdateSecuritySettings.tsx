import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import settingsStore from '@store/settings'
import { SecuritySettingsParam } from '@services/settings.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { actions } = settingsStore
const getMeta = createMetaSelector(actions.updateSecuritySettings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReport = (): { meta: Meta; updateSecuritySettings: (params: SecuritySettingsParam) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const updateSecuritySettings = (param: SecuritySettingsParam) => dispatch(actions.updateSecuritySettings(param))

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.updateSecuritySettings.typePrefix))
    }
  }, [])
  return {
    meta,
    updateSecuritySettings,
  }
}

export default useReport
