import { createReducer } from '@reduxjs/toolkit'
import {
  GetCategoryResponse,
  GetChannelResponse,
  GetStreamUrlAndKeyResponse,
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
}
const initialState: StateType = {
  getStreamUrlAndKeyInfo: {
    data: {
      CHANNEL_ARN: null,
      INGEST_ENDPOINT: null,
      PLAYBACK_URL: null,
      STREAM_KEY_VALUE: null,
      STREAM_URL: null,
      STREAM_KEY_ARN: null,
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
})
