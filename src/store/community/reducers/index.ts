import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { CommunityDetail, CommunityResponse, FollowersTopicResponse, Meta } from '@services/community.service'

type StateType = {
  my_community_list: Array<CommunityResponse> | null
  topicFollowersList: Array<FollowersTopicResponse> | null
  topicFollowersListMeta?: Meta
  community_detail: CommunityDetail
}

const initialState: StateType = { my_community_list: [], topicFollowersList: [], community_detail: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getCommunityList.fulfilled, (state, action) => {
    state.my_community_list = action.payload.data
  })
  builder.addCase(actions.getTopicFollowers.fulfilled, (state, action) => {
    let tmpTopicFollowersList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpTopicFollowersList = state.topicFollowersList.concat(action.payload.data)
    }
    state.topicFollowersList = tmpTopicFollowersList
    state.topicFollowersListMeta = action.payload.meta
  })
  builder.addCase(actions.getCommunityDetail.fulfilled, (state, action) => {
    state.community_detail = action.payload.data
  })
})
