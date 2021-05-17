import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'

const { selectors, actions } = community

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFollower = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const followersTopicList = useAppSelector(selectors.getTopicFollowersList)
  const getFollowersTopicList = () => dispatch(actions.getTopicFollowers())

  return { handleClick, followersTopicList, getFollowersTopicList }
}

export default useFollower
