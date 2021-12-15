import { createReducer } from '@reduxjs/toolkit'
import {
  GetCategoryResponse,
  GetChannelResponse,
  GetStreamUrlAndKeyResponse,
  LiveStreamReportResponse,
  LiveStreamSettingResponse,
  SetChannelResponse,
  SetLiveStreamResponse,
} from '@services/liveStream.service'
import * as actions from '../actions'

type StateType = {
  liveSettingInfo?: LiveStreamSettingResponse
  scheduleInfo?: LiveStreamSettingResponse
  setLiveSettingResponse?: SetLiveStreamResponse
  getStreamUrlAndKeyInfo?: GetStreamUrlAndKeyResponse
  getCategory?: GetCategoryResponse
  getChannel?: GetChannelResponse
  setChannel?: SetChannelResponse
  liveStreamReport?: LiveStreamReportResponse
}
const initialState: StateType = {
  getStreamUrlAndKeyInfo: {
    data: {
      channel_arn: null,
      playback_url: null,
      stream_key_value: null,
      stream_url: null,
      stream_key_arn: null,
    },
  },
  liveStreamReport: {
    data: {
      date_by_videos: [] || null,
      item: null,
    },
  },
}

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getLiveSettingInfo.fulfilled, (state, action) => {
      state.liveSettingInfo = action.payload
    })
    .addCase(actions.getScheduleSettingInfo.fulfilled, (state, action) => {
      state.scheduleInfo = action.payload
    })
    .addCase(actions.setLiveStream.fulfilled, (state, action) => {
      state.setLiveSettingResponse = action.payload
    })
    .addCase(actions.getStreamUrlAndKeyInfo.fulfilled, (state, action) => {
      state.getStreamUrlAndKeyInfo = action.payload
    })
    .addCase(actions.getCategory.fulfilled, (state, action) => {
      state.getCategory = action.payload
    })
    .addCase(actions.getChannel.fulfilled, (state, action) => {
      state.getChannel = action.payload
    })
    .addCase(actions.setChannel.fulfilled, (state, action) => {
      state.setChannel = action.payload
    })
    .addCase(actions.getLiveStreamReport.fulfilled, (state, action) => {
      if (action.meta.arg.period && action.payload.message === 'success') {
        state.liveStreamReport.data.item = action.payload.data.item
      } else {
        state.liveStreamReport = action.payload
      }
    })
})
