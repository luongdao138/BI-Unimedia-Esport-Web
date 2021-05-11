import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.home

export const getRecommendedUsers = createSelector(getRoot, (state) => state.recommendedUsers)
