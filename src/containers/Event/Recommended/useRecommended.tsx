import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfile from '@store/userProfile'

const { selectors, actions } = userProfile

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecommended = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recommendedEventList = useAppSelector(selectors.getRecommendedEvent)
  const getRecommendedEventList = () => dispatch(actions.getRecommendedEvent())

  return { handleClick, recommendedEventList, getRecommendedEventList }
}

export default useRecommended
