import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import followStore from '@store/follow'
import authStore from '@store/auth'
import { FollowersParams } from '@services/follow.service'
import { useEffect } from 'react'

const { selectors, actions } = followStore
const frag = authStore
const authSelector = frag.selectors
const getFollowMeta = createMetaSelector(actions.followers)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useFollowers = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectors.getFollowers)
  const page = useAppSelector(selectors.getFollowersMeta)
  const meta = useAppSelector(getFollowMeta)
  const currentUser = useAppSelector(authSelector.getAuth)
  const followers = (param: FollowersParams) => dispatch(actions.followers(param))
  const resetMeta = () => dispatch(clearMetaData(actions.followers.typePrefix))

  return { currentUser, users, followers, resetMeta, meta, page }
}

export default useFollowers
