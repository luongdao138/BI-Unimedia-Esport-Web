import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import followingStore from '@store/following'
import { FollowingParams } from '@services/following.service'

const { selectors, actions } = followingStore
const getMeta = createMetaSelector(actions.following)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFollowing = () => {
  const dispatch = useAppDispatch()
  const following = useAppSelector(selectors.getFollowing)
  const page = useAppSelector(selectors.getFollowingMeta)
  const meta = useAppSelector(getMeta)
  const fetchFollowing = (param: FollowingParams) => dispatch(actions.following(param))
  const resetMeta = () => dispatch(clearMetaData(actions.following.typePrefix))

  return { following, fetchFollowing, resetMeta, meta, page }
}

export default useFollowing
