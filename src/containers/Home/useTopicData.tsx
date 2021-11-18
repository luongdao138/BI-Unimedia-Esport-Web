import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = community
const getFollowersTopicMeta = createMetaSelector(actions.getTopicFollowers)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTopicData = () => {
  const dispatch = useAppDispatch()

  const followersTopicList = useAppSelector(selectors.getTopicFollowersList)
  const followersTopicListMeta = useAppSelector(getFollowersTopicMeta)
  const getFollowersTopicList = () => dispatch(actions.getTopicFollowers({ page: 1 }))
  const resetFollowersTopicList = () => dispatch(actions.resetTopicFollowers())

  return { followersTopicList, getFollowersTopicList, resetFollowersTopicList, followersTopicListMeta }
}

export default useTopicData
