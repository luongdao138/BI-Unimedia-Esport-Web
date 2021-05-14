import { createAsyncThunk } from '@reduxjs/toolkit'
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
