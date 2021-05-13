import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.userProfile
// const getRootCommunity = (state: RootState) => state.community

export const getUserProfile = createSelector(getRoot, (state) => state.detail)
export const getTourHistories = createSelector(getRoot, (state) => state.tournamentHistories)
export const getTourHistoriesMeta = createSelector(getRoot, (state) => state.tournamentHistoriesMeta)
export const getActivityLogs = createSelector(getRoot, (state) => state.activityLogs)
// export const getCommunityList = createSelector(getRootCommunity, (state) => state.my_community_list)
export const getRecommendations = createSelector(getRoot, (state) => state.recommendations)
