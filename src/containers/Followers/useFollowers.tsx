import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userStore from '@store/userProfile'
import { FollowersParams, FollowResponse, Meta as Pages } from '@services/user.service'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = userStore
const getFollowMeta = createMetaSelector(actions.followers)

const useFollowers = (): {
  followers: Array<FollowResponse>
  page: Pages
  meta: Meta
  resetMeta: () => void
  clearFollowers: () => void
  fetchFollowers: (param: FollowersParams) => void
} => {
  const dispatch = useAppDispatch()
  const followers = useAppSelector(selectors.getFollowers)
  const page = useAppSelector(selectors.getFollowersMeta)
  const meta = useAppSelector(getFollowMeta)
  const fetchFollowers = (param: FollowersParams) => dispatch(actions.followers(param))
  const clearFollowers = () => dispatch(actions.clearFollowers())
  const resetMeta = () => dispatch(clearMetaData(actions.followers.typePrefix))

  return { followers, page, meta, resetMeta, clearFollowers, fetchFollowers }
}

export default useFollowers
