import { createReducer } from '@reduxjs/toolkit'
import { LiveStreamSettingResponse } from '@services/liveStream.service'
import * as actions from '../actions'

type StateType = {
  liveSettingInfo?: LiveStreamSettingResponse
}
const initialState: StateType = {
  liveSettingInfo: {
    data: {
      id: null,
      uuid: '',
      title: '',
      description: '',
      thumbnail: null,
      category: -1,
      stream_url: '',
      stream_key: '',
      ticket_price: 0,
      use_ticket: false,
      share_sns_flag: false,
      publish_flag: true,
      channel_name: '',
      overview: '',
      discord_url: '',
      twitter_url: '',
      instagram_url: '',
      stream_notify_time: null,
      stream_schedule_start_time: null,
      stream_schedule_end_time: null,
      sell_ticket_start_time: null,
    },
  },
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getLiveSettingInfo.fulfilled, (state, action) => {
    state.liveSettingInfo = action.payload
  })
})
