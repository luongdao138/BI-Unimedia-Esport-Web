import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/notification.service'
import { NOTIFICATION_ACTION_TYPE } from './types'

export const notifications = createAsyncThunk<services.NotificationListResponse, services.NotificationListParams>(
  NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION_LIST,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.notificationList(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getNotificationBadge = createAsyncThunk<services.NotificationBadgeResponse>(
  NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION_BADGE,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getNotificationBadge()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getNotificationDetail = createAsyncThunk<services.NotificationDetailResponse, number>(
  NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION_DETAIL,
  async (id, { rejectWithValue }) => {
    try {
      const res = await services.getNotificationDetail(id)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearNotificationDetail = createAction(NOTIFICATION_ACTION_TYPE.CLEAR_NOTIFICATION)
