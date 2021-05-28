import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/chat.service'

import { CHAT_ACTION_TYPE } from './types'

export const getFriendList = createAsyncThunk<services.GetFriendsResponse, services.GetFriendsParam>(
  CHAT_ACTION_TYPE.GET_FRIEND_LIST,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getFriends(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
