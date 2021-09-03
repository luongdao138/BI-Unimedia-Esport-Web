import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import _ from 'lodash'
import { COMMUNITY_ACTION_TYPE } from '../actions/types'
import {
  CommunityDetail,
  CommunityResponse,
  FollowersTopicResponse,
  CommunityFeature,
  PageMeta,
  TopicParams,
  TopicDetail,
  CommunityMember,
  CommentsResponse,
  TopicSearchItem,
} from '@services/community.service'

type StateType = {
  communitiesList?: Array<CommunityResponse>
  topicList?: Array<TopicDetail>
  communitiesListMeta?: PageMeta
  communitiesListByUser?: Array<CommunityResponse>
  communitiesListByUserMeta?: PageMeta
  topicFollowersList: Array<FollowersTopicResponse> | null
  topicFollowersListMeta?: PageMeta
  community_detail?: CommunityDetail
  community_features: Array<CommunityFeature>
  communityMembers?: Array<CommunityMember>
  communityMembersMeta?: PageMeta
  create_Topic?: TopicParams
  topicDetail: TopicDetail | null
  commentsList?: Array<CommentsResponse>
  commentsListMeta?: PageMeta
  topicSearchList?: Array<TopicSearchItem>
  topicSearchListMeta?: PageMeta
  commentsListNextMeta?: PageMeta
  topicListMeta?: PageMeta
}

const initialState: StateType = {
  communitiesList: [],
  communitiesListByUser: [],
  topicFollowersList: [],
  community_features: [],
  topicList: [],
  topicDetail: null,
  commentsList: null,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getTopicList.fulfilled, (state, action) => {
    state.topicList = action.payload.data
    state.topicListMeta = action.payload.meta
  })
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
  builder.addCase(actions.getCommunityMembers.fulfilled, (state, action) => {
    let tmpCommunityMembers = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpCommunityMembers = state.communityMembers.concat(action.payload.data)
    }
    state.communityMembers = tmpCommunityMembers
    state.communityMembersMeta = action.payload.meta
  })
  builder.addCase(actions.getTopicDetail.fulfilled, (state, action) => {
    state.topicDetail = action.payload.data
  })
  builder.addCase(COMMUNITY_ACTION_TYPE.CLEAR_TOPIC_DETAIL, (state) => {
    state.topicDetail = undefined
  })
  builder.addCase(actions.searchTopic.fulfilled, (state, action) => {
    state.topicSearchList = action.payload.data
    state.topicSearchListMeta = action.payload.meta
  })
  builder.addCase(actions.followCommunity.fulfilled, (state, action) => {
    state.community_detail = action.payload.data
  })
  builder.addCase(actions.unfollowCommunity.fulfilled, (state) => {
    state.community_detail.attributes.member_count -= 1
  })
  builder.addCase(COMMUNITY_ACTION_TYPE.RESET_COMMUNITY_MEMBERS, (state) => {
    state.communityMembers = undefined
  })
  builder.addCase(actions.getCommentsListPage.fulfilled, (state, action) => {
    state.commentsListMeta = action.payload.meta
  })
  builder.addCase(actions.getCommentsList.fulfilled, (state, action) => {
    let tmpCommentsList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 0 && state.commentsList != null) {
      tmpCommentsList = _.concat(tmpCommentsList, state.commentsList)
    }
    state.commentsList = tmpCommentsList
    state.commentsListMeta = action.payload.meta
  })
  builder.addCase(actions.getCommentsListNext.fulfilled, (state, action) => {
    let tempCommentsList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 0 && tempCommentsList) {
      tempCommentsList = _.concat(state.commentsList, tempCommentsList)
      state.commentsList = tempCommentsList
      state.commentsListNextMeta = action.payload.meta
    }
  })
})
