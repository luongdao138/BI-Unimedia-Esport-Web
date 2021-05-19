import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfile from '@store/userProfile'

const { selectors, actions } = userProfile

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useEventData = () => {
  const dispatch = useAppDispatch()

  const recommendedEventList = useAppSelector(selectors.getRecommendedEvent)
  const getRecommendedEventList = () => dispatch(actions.getRecommendedEvent())

  return { recommendedEventList, getRecommendedEventList }
}

export default useEventData
