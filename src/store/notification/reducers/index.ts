import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { NotificationResponse, Meta } from '@services/notification.service'

type StateType = {
  my_notification_list: Array<NotificationResponse>
  my_notification_list_meta?: Meta
}

const initialState: StateType = { my_notification_list: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.notifications.fulfilled, (state, action) => {
    let tmpNotifications = action.payload.data
    if (action.payload.links != undefined) {
      tmpNotifications = state.my_notification_list.concat(action.payload.data)
    }
    state.my_notification_list = tmpNotifications
    state.my_notification_list_meta = action.payload.links?.meta
  })
})
