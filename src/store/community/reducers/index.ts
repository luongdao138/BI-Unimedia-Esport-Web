import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { CommunityResponse, FollowersTopicResponse } from '@services/community.service'

type StateType = {
  my_community_list: Array<CommunityResponse> | null
  topic_followers_list: Array<FollowersTopicResponse> | null
}

const initialState: StateType = { my_community_list: null, topic_followers_list: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getCommunityList.fulfilled, (state, action) => {
    state.my_community_list = action.payload.data
  })
  builder.addCase(actions.getTopicFollowers.fulfilled, (state, action) => {
    state.topic_followers_list = action.payload.data
  })
})
