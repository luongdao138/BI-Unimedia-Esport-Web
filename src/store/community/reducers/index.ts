import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { COMMUNITY_ACTION_TYPE } from '../actions/types'
import _ from 'lodash'
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
  TopicDetailList,
  CommentDetail,
} from '@services/community.service'

type StateType = {
  searchCommunity?: CommunityResponse[]
  searchCommunityMeta?: PageMeta
  communitiesList?: CommunityResponse[]
  topicList?: TopicDetailList[]
  communitiesListMeta?: PageMeta
  communitiesListByUser?: CommunityResponse[]
  communitiesListByUserMeta?: PageMeta
  topicFollowersList: FollowersTopicResponse[] | null
  topicFollowersListMeta?: PageMeta
  communityDetail?: CommunityDetail
  community_features: CommunityFeature[]
  communityMembers?: CommunityMember[]
  communityMembersMeta?: PageMeta
  create_Topic?: TopicParams
  topicDetail: TopicDetail | null
  commentDetail?: CommentDetail
  commentsList?: CommentsResponse[]
  commentsListMeta?: PageMeta
  topicSearchList?: TopicSearchItem[]
  topicSearchListMeta?: PageMeta
  topicListMeta?: PageMeta
}

const initialState: StateType = {
  searchCommunity: [],
  communitiesList: [],
  communitiesListByUser: [],
  topicFollowersList: [],
  community_features: [],
  topicList: [],
  topicDetail: null,
  commentsList: [],
  communityDetail: null,
  communityMembers: [],
  commentDetail: null,
  topicSearchList: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.communitySearch.fulfilled, (state, action) => {
    let searchCommunity = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      searchCommunity = _.unionBy(state.searchCommunity, action.payload.data, 'attributes.hash_key')
    }
    state.searchCommunity = searchCommunity
    state.searchCommunityMeta = action.payload.meta
  })
  builder.addCase(actions.getTopicList.fulfilled, (state, action) => {
    state.topicList = action.payload.data
    state.topicListMeta = action.payload.meta
  })
  builder.addCase(actions.createTopic.fulfilled, (state, action) => {
    state.topicDetail = action.payload.data
  })
  builder.addCase(actions.getCommunityList.fulfilled, (state, action) => {
    let tmpCommunitiesList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpCommunitiesList = _.unionBy(state.communitiesList, action.payload.data, 'attributes.hash_key')
    }
    state.communitiesList = tmpCommunitiesList
    state.communitiesListMeta = action.payload.meta
  })
  builder.addCase(actions.clearCommunityData, (state) => {
    state.communitiesList = []
    state.communitiesListMeta = undefined
  })
  builder.addCase(actions.clearTopicListData, (state) => {
    state.topicList = []
    state.topicListMeta = undefined
  })
  builder.addCase(actions.getCommunityListByUser.fulfilled, (state, action) => {
    let tmpCommunitiesList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpCommunitiesList = _.unionBy(state.communitiesListByUser, action.payload.data, 'attributes.hash_key')
    }
    state.communitiesListByUser = tmpCommunitiesList
    state.communitiesListByUserMeta = action.payload.meta
  })
  builder.addCase(actions.clearCommunityDataByUser, (state) => {
    state.communitiesListByUser = []
    state.communitiesListByUserMeta = undefined
  })
  builder.addCase(actions.clearCommunityDetail, (state) => {
    state.communityDetail = undefined
  })
  builder.addCase(actions.getTopicFollowers.fulfilled, (state, action) => {
    let tmpTopicFollowersList = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      //Unused reducer     ref: Home Page
      tmpTopicFollowersList = state.topicFollowersList.concat(action.payload.data)
    }
    state.topicFollowersList = tmpTopicFollowersList
    state.topicFollowersListMeta = action.payload.meta
  })
  builder.addCase(actions.getCommunityDetail.fulfilled, (state, action) => {
    state.communityDetail = action.payload.data
  })
  builder.addCase(actions.getCommunityFeatures.fulfilled, (state, action) => {
    state.community_features = action.payload.data
  })
  builder.addCase(actions.getCommunityMembers.fulfilled, (state, action) => {
    let tmpCommunityMembers = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpCommunityMembers = _.unionBy(state.communityMembers, action.payload.data, 'id')
    }
    state.communityMembers = tmpCommunityMembers
    state.communityMembersMeta = action.payload.meta
  })
  builder.addCase(actions.getTopicDetail.fulfilled, (state, action) => {
    state.topicDetail = action.payload.data
  })
  builder.addCase(actions.clearTopicDetail, (state) => {
    state.topicDetail = null
  })
  builder.addCase(actions.searchTopic.fulfilled, (state, action) => {
    state.topicSearchList = action.payload.data
    state.topicSearchListMeta = action.payload.meta
  })
  builder.addCase(actions.clearSearchTopic, (state) => {
    state.topicSearchList = []
    state.topicSearchListMeta = undefined
  })
  builder.addCase(actions.followCommunity.fulfilled, (state, action) => {
    state.communityDetail = action.payload.data
  })
  builder.addCase(actions.unfollowCommunity.fulfilled, (state) => {
    state.communityDetail.attributes.member_count -= 1
    state.communityDetail.attributes.my_role = null
  })
  builder.addCase(COMMUNITY_ACTION_TYPE.RESET_COMMUNITY_MEMBERS, (state) => {
    state.communityMembers = []
  })
  builder.addCase(actions.getTopicComment.fulfilled, (state, action) => {
    state.commentDetail = action.payload.data
  })
  builder.addCase(COMMUNITY_ACTION_TYPE.RESET_COMMENT_DETAIL, (state) => {
    state.commentDetail = undefined
  })
  builder.addCase(actions.getCommentsList.fulfilled, (state, action) => {
    state.commentsList = action.payload.data
    state.commentsListMeta = action.payload.meta
  })
  builder.addCase(actions.deleteTopicComment.fulfilled, (state, action) => {
    state.commentsList = _.map(state.commentsList, (comment) => {
      return comment.attributes.comment_no === action.meta.arg.comment_no
        ? { ...comment, attributes: { ...comment.attributes, deleted_at: 'date' } }
        : comment
    })
  })
})
