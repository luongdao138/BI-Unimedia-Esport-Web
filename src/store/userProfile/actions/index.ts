import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/user.service'
import { USER_PROFILE_ACTION_TYPE } from './types'

export const getUserProfile = createAsyncThunk(
  USER_PROFILE_ACTION_TYPE.USER_PROFILE_SET_USER_DETAIL,
  async (_u: undefined, { rejectWithValue }) => {
    try {
      const res = await services.getUserProfile()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
    return null
  }
)
// export const tournamentHistorySearch = createAsyncThunk(
//   USER_PROFILE_ACTION_TYPE.TOURNAMENT_HISTORY,
//   async (_u: undefined, { rejectWithValue }) => {
//     try {
//       const res = await services.tournamentHistorySearch(param)
//       return res
//     } catch (error) {
//       if (!error.response) {
//         throw error
//       }
//       return rejectWithValue(error.response.data)
//     }
//     return null
//   }
// )

export const tournamentHistorySearch = createAsyncThunk<services.HistorySearchResponse, services.HistorySearchParams>(
  USER_PROFILE_ACTION_TYPE.TOURNAMENT_HISTORY,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.tournamentHistorySearch(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getActivityLogs = createAsyncThunk<any, services.ActivityLogParams>(
  USER_PROFILE_ACTION_TYPE.PROFILE_ACTIVITY_LOG,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getActivityLog(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
