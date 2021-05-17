import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import recruitment from '@store/recruitment'

const { selectors, actions } = recruitment

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFollower = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const recommendedFollowers = useAppSelector(selectors.getRecruitmentFollowers)
  const getRecruitmentFollowers = () => dispatch(actions.getRecruitmentFollowers())

  return { recommendedFollowers, getRecruitmentFollowers, handleClick }
}

export default useFollower
