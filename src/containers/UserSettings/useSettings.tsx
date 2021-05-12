import { useAppDispatch, useAppSelector } from '@store/hooks'
import settingsStore from '@store/settings'
import _ from 'lodash'

const { selectors, actions } = settingsStore

const useSettings = () => {
  const dispatch = useAppDispatch()

  const features = useAppSelector(selectors.getFeatures)
  const gameTitles = useAppSelector(selectors.getAllGameTitles)
  const getFeatures = () => dispatch(actions.getFeatures())
  const getGameTitles = (text?: string) => dispatch(actions.getAllGameTitles(_.isString(text) ? { searchText: text } : undefined))
  return { features, gameTitles, getFeatures, getGameTitles }
}

export default useSettings
