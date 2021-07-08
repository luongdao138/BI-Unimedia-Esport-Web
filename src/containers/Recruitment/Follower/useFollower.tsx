import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import recruitment from '@store/recruitment'
import { clearMetaData } from '@store/metadata/actions'
import { RecruitmentFollowersParams } from '@services/recruitment.service'

const { selectors, actions } = recruitment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFollower = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recommendedFollowers = useAppSelector(selectors.getRecruitmentFollowers)
  const pages = useAppSelector(selectors.getRecruitmentFollowersMeta)
  const getRecruitmentFollowers = (params: RecruitmentFollowersParams) => dispatch(actions.getRecruitmentFollowers(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getRecruitmentFollowers.typePrefix))

  return { recommendedFollowers, getRecruitmentFollowers, handleClick, pages, resetMeta }
}

export default useFollower
