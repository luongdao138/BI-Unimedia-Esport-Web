import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/purchasePoints.service'
import { POINT_PURCHASE_ACTION_TYPE } from './types'

export const getSavedCards = createAsyncThunk(POINT_PURCHASE_ACTION_TYPE.GET_SAVED_CARDS, async (_u: undefined, { rejectWithValue }) => {
  try {
    const res = await services.getSavedCards()
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})
