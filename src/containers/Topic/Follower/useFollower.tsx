import useReturnHref from '@utils/hooks/useReturnHref'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'
import { clearMetaData } from '@store/metadata/actions'
import { TopicFollowersParams } from '@services/community.service'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = community
const getTopicFollowersMeta = createMetaSelector(actions.getTopicFollowers)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFollower = () => {
  const dispatch = useAppDispatch()
  const { handleReturn } = useReturnHref()
  const handleClick = () => handleReturn()

  const followersTopicList = useAppSelector(selectors.getTopicFollowersList)
  const pages = useAppSelector(selectors.getTopicFollowersListMeta)
  const meta = useAppSelector(getTopicFollowersMeta)

  const getFollowersTopicList = (params: TopicFollowersParams) => dispatch(actions.getTopicFollowers(params))
  const resetMeta = () => dispatch(clearMetaData(actions.getTopicFollowers.typePrefix))

  return { handleClick, followersTopicList, getFollowersTopicList, pages, meta, resetMeta }
}

export default useFollower
