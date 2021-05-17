import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { NotificationResponse, Meta, NotificationBadgeResponse } from '@services/notification.service'

type StateType = {
  notifications?: Array<NotificationResponse>
  notificationsMeta?: Meta
  notificaitonBadge: NotificationBadgeResponse
}

const initialState: StateType = { notifications: [], notificaitonBadge: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.notifications.fulfilled, (state, action) => {
    let tmpNotifications = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpNotifications = state.notifications.concat(action.payload.data)
    }
    state.notifications = tmpNotifications
    state.notificationsMeta = action.payload.meta
  })

  builder.addCase(actions.getNotificationBadge.fulfilled, (state, action) => {
    state.notificaitonBadge = action.payload
  })
})
