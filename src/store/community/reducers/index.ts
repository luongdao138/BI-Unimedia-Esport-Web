import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { CommunityDetail, CommunityResponse, FollowersTopicResponse, CommunityFeature, PageMeta } from '@services/community.service'

type StateType = {
  communitiesList?: Array<CommunityResponse>
  communitiesListMeta?: PageMeta
  communitiesListByUser?: Array<CommunityResponse>
  communitiesListByUserMeta?: PageMeta
  topicFollowersList: Array<FollowersTopicResponse> | null
  topicFollowersListMeta?: PageMeta
  community_detail?: CommunityDetail
  community_features: Array<CommunityFeature>
}

const initialState: StateType = { communitiesList: [], communitiesListByUser: [], topicFollowersList: [], community_features: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getCommunityList.fulfilled, (state, action) => {
    let tmpCommunitiesList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpCommunitiesList = state.communitiesList.concat(action.payload.data)
    }
    state.communitiesList = tmpCommunitiesList
    state.communitiesListMeta = action.payload.meta
  })
  builder.addCase(actions.clearCommunityData, (state) => {
    state.communitiesList = []
    state.communitiesListMeta = undefined
  })

  builder.addCase(actions.getCommunityListByUser.fulfilled, (state, action) => {
    let tmpCommunitiesList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpCommunitiesList = state.communitiesListByUser.concat(action.payload.data)
    }
    state.communitiesListByUser = tmpCommunitiesList
    state.communitiesListByUserMeta = action.payload.meta
  })
  builder.addCase(actions.clearCommunityDataByUser, (state) => {
    state.communitiesListByUser = []
    state.communitiesListByUserMeta = undefined
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
  builder.addCase(actions.getCommunityFeatures.fulfilled, (state, action) => {
    state.community_features = action.payload.data
  })
})
