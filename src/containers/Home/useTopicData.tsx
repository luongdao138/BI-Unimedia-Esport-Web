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

  return { followersTopicList, getFollowersTopicList, followersTopicListMeta }
}

export default useTopicData
