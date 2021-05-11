import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state

export const getRecommendedUsers = createSelector(getRoot, (state) => state)
