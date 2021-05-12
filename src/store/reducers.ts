import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import userProfile from '@store/userProfile'
import search from '@store/search'
import follow from '@store/follow'
import ngWords from '@store/ngWords'
import tournament from '@store/tournament'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  follow: follow.reducers,
  ngWords: ngWords.reducers,
  userProfile: userProfile.reducers,
  tournament: tournament.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
