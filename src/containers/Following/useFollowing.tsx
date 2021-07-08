import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userStore from '@store/userProfile'
import { FollowersParams, FollowResponse, Meta as Pages } from '@services/user.service'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = userStore
const getMeta = createMetaSelector(actions.following)

const useFollowing = (): {
  following: Array<FollowResponse>
  page: Pages
  meta: Meta
  resetMeta: () => void
  clearFollowing: () => void
  increaseFollowing: (user_code: string, isOthers: boolean) => void
  decreaseFollowing: (user_code: string, isOthers: boolean) => void
  fetchFollowing: (param: FollowersParams) => void
} => {
  const dispatch = useAppDispatch()
  const following = useAppSelector(selectors.getFollowing)
  const page = useAppSelector(selectors.getFollowingMeta)
  const meta = useAppSelector(getMeta)
  const fetchFollowing = (param: FollowersParams) => dispatch(actions.following(param))
  const clearFollowing = () => dispatch(actions.clearFollowing())
  const increaseFollowing = (user_code: string, isOthers: boolean) =>
    dispatch(actions.increaseFollowing({ user_code: user_code, isOthers: isOthers }))
  const decreaseFollowing = (user_code: string, isOthers: boolean) =>
    dispatch(actions.decreaseFollowing({ user_code: user_code, isOthers: isOthers }))
  const resetMeta = () => dispatch(clearMetaData(actions.following.typePrefix))

  return { following, page, meta, resetMeta, clearFollowing, fetchFollowing, increaseFollowing, decreaseFollowing }
}

export default useFollowing
