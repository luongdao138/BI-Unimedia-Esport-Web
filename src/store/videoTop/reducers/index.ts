import { createReducer } from '@reduxjs/toolkit'
import { BannerItem, CategoryPopularData, DetailUserData, SearchType, TypeVideo, VideoDetailData } from '@services/videoTop.services'
import * as actions from '../actions'

type StateType = {
  listVideoAll?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archive?: Array<TypeVideo>
  }
  listVideoPopular?: Array<CategoryPopularData>
  listBanner?: Array<BannerItem>
  videoLive?: Array<TypeVideo>
  videoSchedule?: Array<TypeVideo>
  videoArchived?: Array<TypeVideo>
  listVideoFavorite?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archive?: Array<TypeVideo>
  }
  videoSearch?: SearchType
  listVideoSearch?: Array<TypeVideo>
  totalResult?: number
  videoDetailData?: VideoDetailData
  userDetailData?: DetailUserData
}
const initialState: StateType = {
  listVideoAll: {
    live: [],
    schedule: [],
    archive: [],
  },
  listVideoPopular: [],
  listBanner: [],
  videoLive: [],
  videoSchedule: [],
  videoArchived: [],
  listVideoFavorite: {
    live: [],
    schedule: [],
    archive: [],
  },
  videoSearch: {
    total: 0,
    videos: [],
  },
  listVideoSearch: [],
  totalResult: 0,
  videoDetailData: {},
  userDetailData: {},
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
    if (action.payload.data.live.length >= 0) {
      listVideoLive = state.videoLive.concat(action.payload.data.live)
    }
    state.videoLive = listVideoLive
  })
  builder.addCase(actions.getVideoSchedule.fulfilled, (state, action) => {
    let listVideoSchedule = action.payload.data.schedule
    // if (action.payload.data.schedule.length >= 0) {
    listVideoSchedule = state.videoSchedule.concat(action.payload.data.schedule)
    // }
    state.videoSchedule = listVideoSchedule
  })
  builder.addCase(actions.getVideoArchived.fulfilled, (state, action) => {
    let listVideoArchived = action.payload.data.archived
    // if (action.payload.data.schedule.length >= 0) {
    listVideoArchived = state.videoArchived.concat(action.payload.data.archived)
    // }
    state.videoArchived = listVideoArchived
  })
  builder.addCase(actions.getListVideoFavorite.fulfilled, (state, action) => {
    const listVideo = action.payload.data
    state.listVideoFavorite = listVideo
  })
  builder.addCase(actions.videoSearch.fulfilled, (state, action) => {
    let arrayVideo = action.payload.data.videos
    const total = action.payload.data.total
    arrayVideo = state.listVideoSearch.concat(action.payload.data.videos)
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
})
