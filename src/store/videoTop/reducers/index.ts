import { createReducer } from '@reduxjs/toolkit'
import { BannerItem, CategoryPopularData, TypeVideo } from '@services/videoTop.services'
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
})
