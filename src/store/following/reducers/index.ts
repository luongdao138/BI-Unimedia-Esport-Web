import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { UserResponse, Meta } from '@services/follow.service'

type StateType = {
  following?: Array<UserResponse>
  followingMeta?: Meta
}

const initialState: StateType = { following: [] }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.following.fulfilled, (state, action) => {
      let tmpFollowing = action.payload.data
      if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
        tmpFollowing = state.following.concat(action.payload.data)
      }

      state.following = tmpFollowing
      state.followingMeta = action.payload.meta
    })
    .addCase(actions.clearFollowing, (state) => {
      state.following = []
    })
})
