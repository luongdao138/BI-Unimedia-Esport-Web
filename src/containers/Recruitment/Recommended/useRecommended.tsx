import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import recruitment from '@store/recruitment'
import { clearMetaData } from '@store/metadata/actions'
import { RecommendationsParams } from '@services/recruitment.service'

const { selectors, actions } = recruitment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRecommended = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recommendedRecruitments = useAppSelector(selectors.getRecommendations)
  const pages = useAppSelector(selectors.getRecommendationsMeta)
  const getRecruitmentRecommendations = (params: RecommendationsParams) => dispatch(actions.getRecommendations(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getRecommendations.typePrefix))

  return { recommendedRecruitments, getRecruitmentRecommendations, handleClick, pages, resetMeta }
}

export default useRecommended
