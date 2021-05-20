import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import settingsStore from '@store/settings'
import { useEffect } from 'react'
import { MessageSettingsParam } from '@services/settings.service'

const { selectors, actions } = settingsStore

const getMeta = createMetaSelector(actions.getMessageSettings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useMessageSettings = () => {
  const dispatch = useAppDispatch()
  const messageSettings = useAppSelector(selectors.getMessageSettings)
  const fetchMeta = useAppSelector(getMeta)
  const fetchMessageSettings = () => dispatch(actions.getMessageSettings())
  const resetMeta = () => dispatch(clearMetaData(actions.getMessageSettings.typePrefix))
  const updateMeta = useAppSelector(getMeta)
  const updateMessageSettings = (param: MessageSettingsParam) => dispatch(actions.updateMessageSettings(param))

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.updateMessageSettings.typePrefix))
    }
  }, [])
  useEffect(() => {
    fetchMessageSettings()
  }, [])
  return { messageSettings, updateMeta, updateMessageSettings, resetMeta, fetchMeta }
}

export default useMessageSettings
