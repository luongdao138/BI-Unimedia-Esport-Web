import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import settingsStore from '@store/settings'
import { useEffect } from 'react'
import { NotificationSettingsParam } from '@services/settings.service'

const { selectors, actions } = settingsStore
const getMeta = createMetaSelector(actions.getNotificationSettings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNotificationSettings = () => {
  const dispatch = useAppDispatch()
  const notificationSettings = useAppSelector(selectors.getNotificationSetting)
  const meta = useAppSelector(getMeta)
  const fetchNotificationSettings = () => dispatch(actions.getNotificationSettings())
  const updateNotificationSettings = (param: NotificationSettingsParam) => dispatch(actions.updateNotificationSettings(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getSecuritySettings.typePrefix))
  const clearNotificationSettings = dispatch(actions.clearNotificationSettings)
  useEffect(() => {
    fetchNotificationSettings()
  }, [])
  return { notificationSettings, updateNotificationSettings, clearNotificationSettings, meta, resetMeta }
}

export default useNotificationSettings
