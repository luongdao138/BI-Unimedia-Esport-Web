import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.community

export const getCommunityList = createSelector(getRoot, (state) => state.my_community_list)
export const getTopicFollowersList = createSelector(getRoot, (state) => state.topicFollowersList)
export const getTopicFollowersListMeta = createSelector(getRoot, (state) => state.topicFollowersListMeta)
