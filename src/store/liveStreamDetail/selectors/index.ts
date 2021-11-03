import { RootState } from '@store/store'
import { createSelector } from 'reselect'

const getRoot = (state: RootState) => state.liveStreamDetail

export const archivedVideoStream = createSelector(getRoot, (state) => state.videoArchived)
export const relatedVideoStream = createSelector(getRoot, (state) => state.videoRelated)
export const reactionVideoData = createSelector(getRoot, (state) => state.reactionData)
export const followChannelData = createSelector(getRoot, (state) => state.followData)
