import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import userProfile from '@store/userProfile'
import search from '@store/search'
import common from '@store/common'
import settings from '@store/settings'
import follow from '@store/follow'
import following from '@store/following'
import ngWords from '@store/ngWords'
import community from '@store/community'
import tournament from '@store/tournament'
import recruitment from './recruitment'
import game from '@store/game'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  common: common.reducers,
  settings: settings.reducers,
  follow: follow.reducers,
  following: following.reducers,
  ngWords: ngWords.reducers,
  userProfile: userProfile.reducers,
  community: community.reducers,
  tournament: tournament.reducers,
  recruitment: recruitment.reducers,
  gameTitle: game.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
