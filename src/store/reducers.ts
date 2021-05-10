import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import search from '@store/search'
import profile from '@store/profile'
import common from '@store/common'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  profile: profile.reducers,
  common: common.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
