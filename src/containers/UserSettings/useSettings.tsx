import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'

const { selectors, actions } = settingsStore

const useSettings = () => {
  const dispatch = useAppDispatch()

  const features = useAppSelector(selectors.getFeatures)
  const getFeatures = () => dispatch(actions.getFeatures())

  return { features, getFeatures }
}

export default useSettings
