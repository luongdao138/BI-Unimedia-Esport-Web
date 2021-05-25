import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { NotificationResponse, Meta, NotificationBadgeResponse, NotificationDetailResponse } from '@services/notification.service'

type StateType = {
  notifications?: Array<NotificationResponse>
  notificationsMeta?: Meta
  notificaitonBadge: NotificationBadgeResponse
  notificaitonDetail: NotificationDetailResponse
}

const initialState: StateType = { notifications: [], notificaitonBadge: undefined, notificaitonDetail: undefined }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getNotifications.fulfilled, (state, action) => {
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

  builder.addCase(actions.getNotificationDetail.fulfilled, (state, action) => {
    state.notificaitonDetail = action.payload
  })

  builder.addCase(actions.clearNotificationDetail, (state) => {
    state.notificaitonDetail = undefined
  })
})
