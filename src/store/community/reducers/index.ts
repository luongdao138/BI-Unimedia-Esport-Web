import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { CommunityResponse, FollowersTopicResponse } from '@services/community.service'

type StateType = {
  my_community_list: Array<CommunityResponse> | null
  followers_topic_list: Array<FollowersTopicResponse> | null
}

const initialState: StateType = { my_community_list: null, followers_topic_list: null }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getCommunityList.fulfilled, (state, action) => {
    state.my_community_list = action.payload.data
  })
  builder.addCase(actions.getFollowersTopic.fulfilled, (state, action) => {
    state.followers_topic_list = action.payload.data
  })
})
