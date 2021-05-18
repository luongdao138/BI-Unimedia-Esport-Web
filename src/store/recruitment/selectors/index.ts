import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.recruitment

export const getRecommendations = createSelector(getRoot, (state) => state.recommendations)
export const getRecruitmentFollowers = createSelector(getRoot, (state) => state.recruitmentFollowers)
