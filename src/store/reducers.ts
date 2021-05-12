import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import userProfile from '@store/userProfile'
import search from '@store/search'
import profile from '@store/profile'
import common from '@store/common'
import settings from '@store/settings'
import follow from '@store/follow'
import following from '@store/following'
import tournament from '@store/tournament'
import ngWords from '@store/ngWords'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  profile: profile.reducers,
  common: common.reducers,
  settings: settings.reducers,
  follow: follow.reducers,
  following: following.reducers,
  ngWords: ngWords.reducers,
  userProfile: userProfile.reducers,
  tournament: tournament.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
