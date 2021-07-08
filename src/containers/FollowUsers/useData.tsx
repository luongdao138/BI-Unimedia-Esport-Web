import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userStore from '@store/userProfile'
import { FollowersParams, FollowResponse, Meta as Pages } from '@services/user.service'
import { Meta } from '@store/metadata/actions/types'
import { FOLLOW_STATES } from '@constants/common.constants'

const { selectors, actions } = userStore

const useData = (
  fromType: FOLLOW_STATES.FOLLOWERS | FOLLOW_STATES.FOLLOWING
): {
  users: Array<FollowResponse>
  page: Pages
  meta: Meta
  resetMeta: () => void
  clearUsers: () => void
  follow: (user_code: string, isOthers: boolean) => void
  unfollow: (user_code: string, isOthers: boolean) => void
  fetchUsers: (param: FollowersParams) => void
} => {
  const dispatch = useAppDispatch()
  //-----------select data`s --------------
  const isFollowers = fromType === FOLLOW_STATES.FOLLOWERS
  const users = useAppSelector(isFollowers ? selectors.getFollowers : selectors.getFollowing)
  const page = useAppSelector(isFollowers ? selectors.getFollowersMeta : selectors.getFollowingMeta)
  const meta = useAppSelector(createMetaSelector(isFollowers ? actions.followers : actions.following))
  //-----------actions --------------------
  const fetchUsers = (param: FollowersParams) => dispatch(isFollowers ? actions.followers(param) : actions.following(param))
  const clearUsers = () => dispatch(isFollowers ? actions.clearFollowers() : actions.clearFollowing())
  const follow = (user_code: string, isOthers: boolean) =>
    dispatch(actions.followFromList({ user_code: user_code, isOthers: isOthers, fromType: fromType }))
  const unfollow = (user_code: string, isOthers: boolean) =>
    dispatch(actions.unfollowFromList({ user_code: user_code, isOthers: isOthers, fromType: fromType }))
  const resetMeta = () => dispatch(clearMetaData(isFollowers ? actions.followers.typePrefix : actions.following.typePrefix))

  return { users, page, meta, resetMeta, clearUsers, follow, unfollow, fetchUsers }
}

export default useData
