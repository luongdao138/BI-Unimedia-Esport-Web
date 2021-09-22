import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
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

export const deleteCard = createAsyncThunk(POINT_PURCHASE_ACTION_TYPE.DELETE_CARD, async (card_seq: string, { rejectWithValue }) => {
  try {
    const res = await services.deleteCard(card_seq)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const purchasePointUseNewCard = createAsyncThunk(
  POINT_PURCHASE_ACTION_TYPE.PURCHASE_POINT_USE_NEW_CARD,
  async (purchase_info: services.ParamsPurchasePointUseNewCard, { rejectWithValue }) => {
    try {
      const res = await services.purchasePointUseNewCard(purchase_info)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const purchasePointUseOldCard = createAsyncThunk(
  POINT_PURCHASE_ACTION_TYPE.PURCHASE_POINT_USE_OLD_CARD,
  async (purchase_info: services.ParamsPurchasePointUseOldCard, { rejectWithValue }) => {
    try {
      const res = await services.purchasePointUseOldCard(purchase_info)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetErrorMess = createAction(POINT_PURCHASE_ACTION_TYPE.RESET_ERROR_MESS_PURCHASE_POINT)