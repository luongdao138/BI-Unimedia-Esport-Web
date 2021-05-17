import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.community

export const getCommunityList = createSelector(getRoot, (state) => state.my_community_list)
export const getFollowersTopicList = createSelector(getRoot, (state) => state.followers_topic_list)
