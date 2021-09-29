import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { UserResponse, Meta } from '@services/search.service'
import { searchTypes } from '@constants/common.constants'

type StateType = {
  searchUsers?: Array<UserResponse>
  searchUsersMeta?: Meta
  type: number
  keyword: string
  //only search video
  typeSearchVideo: number
  categoryID: number
}

const initialState: StateType = { searchUsers: [], type: searchTypes.USER, keyword: '', typeSearchVideo: searchTypes.VIDEO, categoryID: 0 }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.userSearch.fulfilled, (state, action) => {
    let tmpSearchUsers = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpSearchUsers = state.searchUsers.concat(action.payload.data)
    }

    state.searchUsers = tmpSearchUsers
    state.searchUsersMeta = action.payload.meta
  })

  builder.addCase(actions.setSearchParams, (state, action) => {
    if (action.payload.type !== searchTypes.VIDEO) {
      state.type = action.payload.type
    } else {
      state.typeSearchVideo = action.payload.type
    }
    state.keyword = action.payload.keyword
  })

  builder.addCase(actions.resetSearchUsers, (state) => {
    state.searchUsers = []
    state.searchUsersMeta = undefined
  })

  //only search video
  builder.addCase(actions.setSearchVideoParams, (state, action) => {
    state.typeSearchVideo = action.payload.type
    state.keyword = action.payload.keyword
  })

  builder.addCase(actions.setCategoryIdParams, (state, action) => {
    state.typeSearchVideo = action.payload.type
    state.categoryID = action.payload.category_id
  })
})
