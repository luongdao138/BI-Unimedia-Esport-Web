import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.community

export const getCommunityList = createSelector(getRoot, (state) => state.communitiesList)
export const getCommunityListMeta = createSelector(getRoot, (state) => state.communitiesListMeta)
export const getCommunityListByUser = createSelector(getRoot, (state) => state.communitiesListByUser)
export const communitiesListByUserMeta = createSelector(getRoot, (state) => state.communitiesListByUserMeta)
export const getTopicFollowersList = createSelector(getRoot, (state) => state.topicFollowersList)
export const getTopicFollowersListMeta = createSelector(getRoot, (state) => state.topicFollowersListMeta)
export const getCommunityDetail = createSelector(getRoot, (state) => state.community_detail)
export const getCommunityFeatures = createSelector(getRoot, (state) => state.community_features)
export const getCommunityMembers = createSelector(getRoot, (state) => state.communityMembers)
export const getTopicDetail = createSelector(getRoot, (state) => state.topicDetail)
