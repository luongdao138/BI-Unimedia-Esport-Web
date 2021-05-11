import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/ngWords.service'
import { NG_WORDS_ACTION_TYPE } from './types'

export const getNgWords = createAsyncThunk<services.NgWordsResponse>(NG_WORDS_ACTION_TYPE.GET_WORDS, async (_, { rejectWithValue }) => {
  try {
    const res = await services.getNgWords()
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})
