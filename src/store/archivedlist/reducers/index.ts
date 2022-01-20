import { createReducer } from '@reduxjs/toolkit'
import { TYPE_VIDEO_ARCHIVE, ArchiveDetailDataType, CookieData } from '@services/archiveList.service'
import * as actions from '../actions'

export type StateType = {
  archiveList?: {
    total: number
    videos: Array<TYPE_VIDEO_ARCHIVE>
  }
  archiveDetail?: ArchiveDetailDataType
  dataCookie?: CookieData
}

const initialState: StateType = {
  archiveList: {
    total: 0,
    videos: [],
  },
  archiveDetail: null,
  dataCookie: null,
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getArchiveList.fulfilled, (state, action) => {
      state.archiveList = action.payload?.data
    })
    .addCase(actions.getArchiveDetail.fulfilled, (state, action) => {
      state.archiveDetail = action.payload.data
    })
    .addCase(actions.overrideArchiveVideo, (state, action) => {
      const { description, title, publish_flag, thumbnail, uuid } = action.payload
      const { videos } = state.archiveList
      const _videos = videos.map((video) => {
        if (video.uuid !== uuid) return video
        return {
          ...video,
          thumbnail,
          publish_flag,
          title,
          description,
        }
      })
      state.archiveList.videos = _videos
    })
    .addCase(actions.overrideDeleteVideo, (state, action) => {
      const { uuid } = action.payload
      const { videos, total } = state.archiveList
      const _videos = videos.filter((video) => video.uuid !== uuid)
      const _total = total - 1
      state.archiveList = {
        videos: _videos,
        total: _total,
      }
    })
    .addCase(actions.getCookieDownloadVideo.fulfilled, (state, action) => {
      state.dataCookie = action.payload.data
    })
})
