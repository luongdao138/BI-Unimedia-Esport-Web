import { RootState } from '@store/store'
import { createSelector } from 'reselect'

const getRoot = (state: RootState) => state.videoTop

export const getVideoLive = createSelector(getRoot, (state) => state.listVideoAll.live)
export const getVideoSchedule = createSelector(getRoot, (state) => state.listVideoAll.schedule)
export const getVideoArchive = createSelector(getRoot, (state) => state.listVideoAll.archive)
