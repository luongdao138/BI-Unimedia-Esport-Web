import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { UserSearchResponse, Meta } from '@services/search.service'

type StateType = {
  searchUsers?: Array<UserSearchResponse>
  searchUsersMeta?: Meta
}

const initialState: StateType = { searchUsers: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.userSearch.fulfilled, (state, action) => {
    let tmpSearchUsers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      tmpSearchUsers = state.searchUsers.concat(action.payload.data)
    }

    state.searchUsers = tmpSearchUsers
    state.searchUsersMeta = action.payload.links?.meta
  })
})
