import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'

const { selectors, actions } = settingsStore

const useSettings = () => {
  const dispatch = useAppDispatch()

  const features = useAppSelector(selectors.getFeatures)
  const gameTitles = useAppSelector(selectors.getAllGameTitles)
  const getFeatures = () => dispatch(actions.getFeatures())
  const getGameTitles = () => dispatch(actions.getAllGameTitles())
  return { features, gameTitles, getFeatures, getGameTitles }
}

export default useSettings
