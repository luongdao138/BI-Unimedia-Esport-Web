import { createReducer } from '@reduxjs/toolkit'
import { TYPE_VIDEO_ARCHIVE, ArchiveDetailDataType } from '@services/archiveList.service'
import * as actions from '../actions'

export type StateType = {
  archiveList?: {
    total: number
    videos: Array<TYPE_VIDEO_ARCHIVE>
  }
  archiveDetail?: ArchiveDetailDataType
}

const initialState: StateType = {
  archiveList: {
    total: 0,
    videos: [],
  },
  archiveDetail: null,
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getArchiveList.fulfilled, (state, action) => {
      state.archiveList = action.payload?.data
    })
    .addCase(actions.getArchiveDetail.fulfilled, (state, action) => {
      state.archiveDetail = action.payload.data
    })
})
