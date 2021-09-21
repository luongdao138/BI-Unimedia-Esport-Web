import { createReducer } from '@reduxjs/toolkit'
import { BannerItem, CategoryPopularData, DetailUserData, SearchType, TypeVideo, VideoDetailData } from '@services/videoTop.services'
import * as actions from '../actions'

type StateType = {
  listVideoAll?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archived?: Array<TypeVideo>
  }
  listVideoPopular?: Array<CategoryPopularData>
  listBanner?: Array<BannerItem>
  videoLive?: Array<TypeVideo>
  videoSchedule?: Array<TypeVideo>
  videoArchived?: Array<TypeVideo>
  listVideoFavorite?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archived?: Array<TypeVideo>
  }
  videoSearch?: SearchType
  listVideoSearch?: Array<TypeVideo>
  totalResult?: number
  videoDetailData?: VideoDetailData
  userDetailData?: DetailUserData
  streaming_second?: number
  played_second?: number
  is_viewing_stream?: boolean
}
const initialState: StateType = {
  listVideoAll: {
    live: [],
    schedule: [],
    archived: [],
  },
  listVideoPopular: [],
  listBanner: [],
  videoLive: [],
  videoSchedule: [],
  videoArchived: [],
  listVideoFavorite: {
    live: [],
    schedule: [],
    archived: [],
  },
  videoSearch: {
    total: 0,
    videos: [],
  },
  listVideoSearch: [],
  totalResult: 0,
  videoDetailData: {},
  userDetailData: {},
  streaming_second: -1,
  played_second: -1,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getListVideoAll.fulfilled, (state, action) => {
    const listVideo = action.payload.data
    state.listVideoAll = listVideo
  })
  builder.addCase(actions.getCategoryPopularVideo.fulfilled, (state, action) => {
    const videoPopular = action.payload.data
    state.listVideoPopular = videoPopular
  })
  builder.addCase(actions.getBannerTop.fulfilled, (state, action) => {
    const listBanner = action.payload.data
    state.listBanner = listBanner
  })
  builder.addCase(actions.getVideoLive.fulfilled, (state, action) => {
    let listVideoLive = action.payload.data.live
    if (action.meta.arg.page > 1) {
      listVideoLive = state.videoLive.concat(action.payload.data.live)
    }
    state.videoLive = listVideoLive
  })
  builder.addCase(actions.getVideoSchedule.fulfilled, (state, action) => {
    let listVideoSchedule = action.payload.data.schedule
    if (action.meta.arg.page > 1) {
      listVideoSchedule = state.videoSchedule.concat(action.payload.data.schedule)
    }
    state.videoSchedule = listVideoSchedule
  })
  builder.addCase(actions.getVideoArchived.fulfilled, (state, action) => {
    let listVideoArchived = action.payload.data.archived
    if (action.meta.arg.page > 1) {
      listVideoArchived = state.videoArchived.concat(action.payload.data.archived)
    }
    state.videoArchived = listVideoArchived
  })
  builder.addCase(actions.getListVideoFavorite.fulfilled, (state, action) => {
    const listVideo = action.payload.data
    state.listVideoFavorite = listVideo
  })
  builder.addCase(actions.videoSearch.fulfilled, (state, action) => {
    let arrayVideo = action.payload.data.videos
    const total = action.payload.data.total
    if (action.meta.arg.page > 1) {
      arrayVideo = state.listVideoSearch.concat(action.payload.data.videos)
    }
    state.listVideoSearch = arrayVideo
    state.totalResult = total
  })
  builder.addCase(actions.resetSearchVideo, (state) => {
    state.listVideoSearch = []
    state.totalResult = 0
  })
  builder.addCase(actions.resetLive, (state) => {
    state.videoLive = []
  })
  builder.addCase(actions.resetSchedule, (state) => {
    state.videoSchedule = []
  })
  builder.addCase(actions.resetArchive, (state) => {
    state.videoArchived = []
  })
  builder.addCase(actions.videoDetail.fulfilled, (state, action) => {
    const videoData = action.payload.data.video
    const userData = action.payload.data.user
    state.videoDetailData = videoData
    state.userDetailData = userData
  })
  builder.addCase(actions.changeStreamingSecond, (state, action) => {
    state.streaming_second = action.payload.streaming_second
  })
  builder.addCase(actions.changePlayedSecond, (state, action) => {
    state.played_second = action.payload.played_second
  })
  builder.addCase(actions.changeIsViewingStream, (state, action) => {
    state.is_viewing_stream = action.payload.is_viewing_stream
  })
  builder.addCase(actions.changeVideoTime, (state, action) => {
    state.streaming_second = action.payload.streaming_second
    state.played_second = action.payload.played_second
  })
})
