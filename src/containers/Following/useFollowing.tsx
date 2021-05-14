import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import followingStore from '@store/following'
import authStore from '@store/auth'
import { FollowingParams } from '@services/following.service'

const { selectors, actions } = followingStore
const frag = authStore
const authSelector = frag.selectors
const getMeta = createMetaSelector(actions.following)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFollowing = () => {
  const dispatch = useAppDispatch()
  const following = useAppSelector(selectors.getFollowing)
  const page = useAppSelector(selectors.getFollowingMeta)
  const meta = useAppSelector(getMeta)
  const currentUser = useAppSelector(authSelector.getAuth)
  const fetchFollowing = (param: FollowingParams) => dispatch(actions.following(param))
  const clearFollowing = () => dispatch(actions.clearFollowing())
  const resetMeta = () => dispatch(clearMetaData(actions.following.typePrefix))

  return { clearFollowing, currentUser, following, fetchFollowing, resetMeta, meta, page }
}

export default useFollowing
