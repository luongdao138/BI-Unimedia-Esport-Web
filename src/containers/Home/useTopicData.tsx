import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'

const { selectors, actions } = community

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTopicData = () => {
  const dispatch = useAppDispatch()

  const followersTopicList = useAppSelector(selectors.getTopicFollowersList)
  const getFollowersTopicList = () => dispatch(actions.getTopicFollowers({ page: 1 }))

  return { followersTopicList, getFollowersTopicList }
}

export default useTopicData
