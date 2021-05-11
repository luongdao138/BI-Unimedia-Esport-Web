import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import userProfile from '@store/userProfile'
import search from '@store/search'
import profile from '@store/profile'
import common from '@store/common'
import settings from '@store/settings'
import tournament from '@store/tournament'
import game from '@store/game'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  profile: profile.reducers,
  common: common.reducers,
  settings: settings.reducers,
  userProfile: userProfile.reducers,
  tournament: tournament.reducers,
  gameTitle: game.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
