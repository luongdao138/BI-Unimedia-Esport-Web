import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'

const reducer = combineReducers({
  auth: auth.reducers,
  metadata: metadata.reducer,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
