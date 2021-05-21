import { useAppDispatch, useAppSelector } from '@store/hooks'
import recruitment from '@store/recruitment'

const { selectors, actions } = recruitment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecruitmentData = () => {
  const dispatch = useAppDispatch()

  const recommendedRecruitments = useAppSelector(selectors.getRecommendations)
  const recruitmentFollow = useAppSelector(selectors.getRecruitmentFollowers)
  const getRecruitmentRecommendations = () => dispatch(actions.getRecommendations({ page: 1 }))
  const getRecruitmentFollow = () => dispatch(actions.getRecruitmentFollowers({ page: 1 }))

  return { recommendedRecruitments, getRecruitmentRecommendations, recruitmentFollow, getRecruitmentFollow }
}

export default useRecruitmentData
