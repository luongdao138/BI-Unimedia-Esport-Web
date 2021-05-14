import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/notification.service'
import { NOTIFICATION_ACTION_TYPE } from './types'

export const getNotificationList = createAsyncThunk<services.NotificationListResponse>(
  NOTIFICATION_ACTION_TYPE.GET_NOTIFICATION_LIST,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.notificationList()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
