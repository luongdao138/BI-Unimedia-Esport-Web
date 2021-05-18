import { useAppDispatch, useAppSelector } from '@store/hooks'
import recruitment from '@store/recruitment'

const { selectors, actions } = recruitment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecruitmentData = () => {
  const dispatch = useAppDispatch()

  const recommendedRecruitments = useAppSelector(selectors.getRecommendations)
  const recruitmentFollow = useAppSelector(selectors.getRecruitmentFollowers)
  const getRecruitmentRecommendations = () => dispatch(actions.getRecommendations())
  const getRecruitmentFollow = () => dispatch(actions.getRecruitmentFollowers())

  return { recommendedRecruitments, getRecruitmentRecommendations, recruitmentFollow, getRecruitmentFollow }
}

export default useRecruitmentData
