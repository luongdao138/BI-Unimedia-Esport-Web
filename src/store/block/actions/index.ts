import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/block.service'
import { BLOCK_ACTION_TYPE } from './types'

export const blockUser = createAsyncThunk<services.BlockResponse, services.BlockParams>(
  BLOCK_ACTION_TYPE.BLOCK,
  async (blockParams, { rejectWithValue }) => {
    try {
      const res = await services.blockUser(blockParams)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const unblockUser = createAsyncThunk<services.UnblockResponse, services.UnblockParams>(
  BLOCK_ACTION_TYPE.UNBLOCK,
  async (unblockParams, { rejectWithValue }) => {
    try {
      const res = await services.unblockUser(unblockParams)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
