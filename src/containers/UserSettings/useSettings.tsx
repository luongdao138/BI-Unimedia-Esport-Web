import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'

const { selectors, actions } = settingsStore

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSettings = () => {
  const dispatch = useAppDispatch()

  const features = useAppSelector(selectors.getFeatures)
  const getFeatures = () => dispatch(actions.getFeatures())

  return { features, getFeatures }
}

export default useSettings
