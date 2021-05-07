import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/search.service'
import { SEARCH_ACTION_TYPE } from './types'

export const userSearch = createAsyncThunk<services.UserSearchResponse, services.UserSearchParams>(
  SEARCH_ACTION_TYPE.USER_SEARCH,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.userSearch(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
