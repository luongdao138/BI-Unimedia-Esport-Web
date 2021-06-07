import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { UserResponse, Meta } from '@services/search.service'
import { searchTypes } from '@constants/common.constants'

type StateType = {
  searchUsers?: Array<UserResponse>
  searchUsersMeta?: Meta
  type: number
  keyword: string
}

const initialState: StateType = { searchUsers: [], type: searchTypes.USER, keyword: '' }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.userSearch.fulfilled, (state, action) => {
    let tmpSearchUsers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      tmpSearchUsers = state.searchUsers.concat(action.payload.data)
    }

    state.searchUsers = tmpSearchUsers
    state.searchUsersMeta = action.payload.links?.meta
  })

  builder.addCase(actions.setSearchParams, (state, action) => {
    state.type = action.payload.type
    state.keyword = action.payload.keyword
  })

  builder.addCase(actions.resetSearchUsers, (state) => {
    state.searchUsers = []
    state.searchUsersMeta = undefined
  })
})
