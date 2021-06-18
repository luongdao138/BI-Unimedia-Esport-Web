import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { FollowResponse, Meta } from '@services/follow.service'

type StateType = {
  followers?: Array<FollowResponse>
  followersMeta?: Meta
  following?: Array<FollowResponse>
  followingMeta?: Meta
}

const initialState: StateType = { followers: [], following: [], followersMeta: undefined, followingMeta: undefined }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.followers.fulfilled, (state, action) => {
      let tmpFollowers = action.payload.data
      if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
        tmpFollowers = state.followers.concat(action.payload.data)
      }

      state.followers = tmpFollowers
      state.followersMeta = action.payload.meta
    })
    .addCase(actions.clearFollowers, (state) => {
      state.followers = []
    })
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
    .addCase(actions.increaseFollowing.fulfilled, (state, action) => {
      if (state.following) {
        state.following.filter((user) => {
          if (user.attributes.user_code === action.payload) {
            user.attributes.is_following = true
            return true
          }
        })
      }
      if (state.followingMeta) state.followingMeta.total_count = state.followingMeta.total_count + 1
    })
    .addCase(actions.decreaseFollowing.fulfilled, (state, action) => {
      if (state.following) {
        state.following.filter((user) => {
          if (user.attributes.user_code === action.payload) {
            user.attributes.is_following = false
          }
        })
      }
      if (state.followingMeta && state.followingMeta.total_count > 0) state.followingMeta.total_count = state.followingMeta.total_count - 1
    })
})
