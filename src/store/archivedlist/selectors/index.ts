import { RootState } from '@store/store'
import { createSelector } from 'reselect'
import { StateType } from '@store/archivedlist/reducers'

const getRoot = (state: RootState) => state.streamerArchiveList
const getArchiveList = (state: StateType) => state.archiveList
const getArchiveDetail = (state: StateType) => state.archiveDetail

export const getArchiveVideoList = createSelector(getRoot, getArchiveList)
export const getArchiveVideoDetail = createSelector(getRoot, getArchiveDetail)
