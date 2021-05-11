import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/game.service'
import { GET_GAME_BY_GENRE, GET_GAME_GENRES } from './types'

export const getGameGenres = createAsyncThunk<services.GameGenreResponse>(GET_GAME_GENRES, async (_param, { rejectWithValue }) => {
  try {
    const res = await services.getGameGenres()
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const getGameByGenreId = createAsyncThunk<services.GameTitleResponse, number>(GET_GAME_BY_GENRE, async (id, { rejectWithValue }) => {
  try {
    const res = await services.getGameByGenreId(id)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})
