import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/chat.service'

import { MESSAGE_ACTION_TYPE } from './types'

export const getFriendList = createAsyncThunk<services.GetFriendsResponse, services.GetFriendsParam>(
  MESSAGE_ACTION_TYPE.GET_FRIEND_LIST,
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

export const directRoomCheck = createAsyncThunk<services.CheckChatResponse, string>(
  MESSAGE_ACTION_TYPE.DIRECT_ROOM_CHECK,
  async (userCode, { rejectWithValue }) => {
    try {
      const res = await services.directRoomCheck(userCode)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMessageTournamentDetail = createAsyncThunk<services.MessageTournamentResponse, string>(
  MESSAGE_ACTION_TYPE.GET_TOURNAMENT_DETAIL,
  async (roomId, { rejectWithValue }) => {
    try {
      const res = await services.getMessageTournamentDetail(roomId)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetAddUsers = createAction(MESSAGE_ACTION_TYPE.RESET_ADD_USERS)
