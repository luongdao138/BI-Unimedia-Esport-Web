import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { NotificationResponse, Meta, NotificationBadgeResponse, NotificationDetailResponse } from '@services/notification.service'
import _ from 'lodash'

type StateType = {
  notifications?: Array<NotificationResponse>
  notificationBarList: Array<NotificationResponse>
  notificationsMeta?: Meta
  notificaitonBadge?: NotificationBadgeResponse
  notificaitonDetail?: NotificationDetailResponse
}

const initialState: StateType = { notifications: [], notificationBarList: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getNotifications.fulfilled, (state, action) => {
    let tmpNotifications = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpNotifications = _.unionBy(state.notifications, action.payload.data, 'id')
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

  builder.addCase(actions.seenNotificationBadge.fulfilled, (state) => {
    state.notificaitonBadge = undefined
  })

  builder.addCase(actions.clearNotificationBadge, (state) => {
    state.notificaitonBadge = undefined
  })

  builder.addCase(actions.getNotificationBadgeList.fulfilled, (state, action) => {
    state.notificationBarList = action.payload.data
  })
  builder.addCase(actions.clearNotificationList, (state) => {
    state.notifications = []
    state.notificationsMeta = undefined
  })
})
