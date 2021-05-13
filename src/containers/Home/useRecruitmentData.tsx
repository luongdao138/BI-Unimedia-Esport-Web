import { useAppDispatch, useAppSelector } from '@store/hooks'
import recruitment from '@store/recruitment'

const { selectors, actions } = recruitment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecruitmentData = () => {
  const dispatch = useAppDispatch()

  const recommendedRecruitments = useAppSelector(selectors.getRecommendations)
  const getRecruitmentRecommendations = () => dispatch(actions.getRecommendations())

  return { recommendedRecruitments, getRecruitmentRecommendations }
}

export default useRecruitmentData
