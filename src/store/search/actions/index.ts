import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
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

export const resetSearchUsers = createAction(SEARCH_ACTION_TYPE.RESET_SEARCH_USERS)
export const setSearchParams = createAction<services.SearchParams>(SEARCH_ACTION_TYPE.SET_SEARCH_PARAMS)

//only search video
export const setSearchVideoParams = createAction<services.SearchParams>(SEARCH_ACTION_TYPE.SET_SEARCH_VIDEO_PARAMS)
export const setCategoryIdParams = createAction<services.CategoryIDParams>(SEARCH_ACTION_TYPE.SET_CATEGORY_ID_PARAMS)
