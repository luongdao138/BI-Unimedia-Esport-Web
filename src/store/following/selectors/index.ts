import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.following

export const getFollowing = createSelector(getRoot, (state) => state.following)
export const getFollowingMeta = createSelector(getRoot, (state) => state.followingMeta)
