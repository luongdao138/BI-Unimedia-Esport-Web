import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.follow

export const getFollowers = createSelector(getRoot, (state) => state.followers)
export const getFollowersMeta = createSelector(getRoot, (state) => state.followersMeta)
