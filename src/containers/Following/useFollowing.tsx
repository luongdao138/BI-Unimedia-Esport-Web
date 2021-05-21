import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import followStore from '@store/follow'
import { FollowersParams, FollowResponse, Meta as Pages } from '@services/follow.service'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = followStore
const getMeta = createMetaSelector(actions.following)

const useFollowing = (): {
  following: Array<FollowResponse>
  page: Pages
  meta: Meta
  resetMeta: () => void
  clearFollowing: () => void
  fetchFollowing: (param: FollowersParams) => void
} => {
  const dispatch = useAppDispatch()
  const following = useAppSelector(selectors.getFollowing)
  const page = useAppSelector(selectors.getFollowingMeta)
  const meta = useAppSelector(getMeta)
  const fetchFollowing = (param: FollowersParams) => dispatch(actions.following(param))
  const clearFollowing = () => dispatch(actions.clearFollowing())
  const resetMeta = () => dispatch(clearMetaData(actions.following.typePrefix))

  return { following, page, meta, resetMeta, clearFollowing, fetchFollowing }
}

export default useFollowing
