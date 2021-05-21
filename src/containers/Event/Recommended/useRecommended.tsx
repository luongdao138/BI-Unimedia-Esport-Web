import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfile from '@store/userProfile'
import { clearMetaData } from '@store/metadata/actions'
import { RecommendedEventParams } from '@services/user.service'

const { selectors, actions } = userProfile

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecommended = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recommendedEventList = useAppSelector(selectors.getRecommendedEvent)
  const pages = useAppSelector(selectors.getRecommendedEventMeta)
  const getRecommendedEventList = (params: RecommendedEventParams) => dispatch(actions.getRecommendedEvent(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getRecommendedEvent.typePrefix))

  return { handleClick, recommendedEventList, pages, getRecommendedEventList, resetMeta }
}

export default useRecommended
