import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { NotificationResponse, Meta } from '@services/notification.service'

type StateType = {
  notifications?: Array<NotificationResponse>
  notificationsMeta?: Meta
}

const initialState: StateType = { notifications: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.notifications.fulfilled, (state, action) => {
    let tmpNotifications = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpNotifications = state.notifications.concat(action.payload.data)
    }
    state.notifications = tmpNotifications
    state.notificationsMeta = action.payload.meta
  })
})
