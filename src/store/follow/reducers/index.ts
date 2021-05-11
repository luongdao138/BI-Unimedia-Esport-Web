import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { UserResponse, Meta } from '@services/follow.service'

type StateType = {
  followers?: Array<UserResponse>
  followersMeta?: Meta
}

const initialState: StateType = { followers: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.followers.fulfilled, (state, action) => {
    console.log('reducer work?')
    let tmpFollowers = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      tmpFollowers = state.followers.concat(action.payload.data)
    }

    state.followers = tmpFollowers
    state.followersMeta = action.payload.links?.meta
  })
})
