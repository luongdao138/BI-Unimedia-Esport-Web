import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import search from '@store/search'
import tournament from '@store/tournament'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  tournament: tournament.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
