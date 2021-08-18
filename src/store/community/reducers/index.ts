import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { CommunityResponse, FollowersTopicResponse, PageMeta } from '@services/community.service'

type StateType = {
  communitiesList?: Array<CommunityResponse>
  communitiesListMeta?: PageMeta
  topicFollowersList: Array<FollowersTopicResponse> | null
  topicFollowersListMeta?: PageMeta
}

const initialState: StateType = { communitiesList: [], topicFollowersList: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getCommunityList.fulfilled, (state, action) => {
    state.communitiesList = action.payload.data
  })
  builder.addCase(actions.getTopicFollowers.fulfilled, (state, action) => {
    let tmpTopicFollowersList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpTopicFollowersList = state.topicFollowersList.concat(action.payload.data)
    }
    state.topicFollowersList = tmpTopicFollowersList
    state.topicFollowersListMeta = action.payload.meta
  })
})
