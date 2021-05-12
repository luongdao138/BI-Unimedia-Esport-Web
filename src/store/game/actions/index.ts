import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/game.service'
import { CLEAR_GAME_TITLES, GET_GAME_BY_GENRE, GET_GAME_BY_TITLE, GET_GAME_GENRES } from './types'

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

export const getGameByTitle = createAsyncThunk<services.GameTitleResponse, string>(
  GET_GAME_BY_TITLE,
  async (title, { rejectWithValue }) => {
    try {
      const res = await services.getGameByTitle(title)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const createGameTitle = createAsyncThunk<services.CreateGameTitleResponse, services.CreateGameTitleParams>(
  GET_GAME_BY_TITLE,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.createGameTitle(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearGameTitles = createAction(CLEAR_GAME_TITLES)
