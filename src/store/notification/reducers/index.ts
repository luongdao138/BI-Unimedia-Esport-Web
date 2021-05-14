import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { NotificationResponse } from '@services/notification.service'

type StateType = {
  my_notification_list: Array<NotificationResponse> | null
}

const initialState: StateType = { my_notification_list: null }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getNotificationList.fulfilled, (state, action) => {
    state.my_notification_list = action.payload.data
  })
})
