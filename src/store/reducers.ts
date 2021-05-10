import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import search from '@store/search'
import profile from '@store/profile'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  profile: profile.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
