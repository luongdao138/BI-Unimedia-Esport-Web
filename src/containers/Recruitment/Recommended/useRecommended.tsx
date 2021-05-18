import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import recruitment from '@store/recruitment'

const { selectors, actions } = recruitment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecommended = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recommendedRecruitments = useAppSelector(selectors.getRecommendations)
  const getRecruitmentRecommendations = () => dispatch(actions.getRecommendations())

  return { recommendedRecruitments, getRecruitmentRecommendations, handleClick }
}

export default useRecommended
