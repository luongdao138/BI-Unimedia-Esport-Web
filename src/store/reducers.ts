import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import search from '@store/search'
import ngWords from '@store/ngWords'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  ngWords: ngWords.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
