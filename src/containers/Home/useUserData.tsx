import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfile from '@store/userProfile'

const { selectors, actions } = userProfile

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUserData = () => {
  const dispatch = useAppDispatch()

  const recommendedUsers = useAppSelector(selectors.getRecommendations)
  const getUserRecommendations = () => dispatch(actions.getRecommendations())

  return { recommendedUsers, getUserRecommendations }
}

export default useUserData
