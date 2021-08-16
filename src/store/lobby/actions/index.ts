import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/lobby.service'
import { LOBBY_ACTION_TYPE } from './types'

export const entryLobby = createAsyncThunk<services.EntryLobbyResponse, number>(
  LOBBY_ACTION_TYPE.LOBBY_ENTRY,
  async (params, { rejectWithValue }) => {
    try {
      await services.entry(params)
      const data = {
        data: params,
        status: 'success',
      }
      return data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const unjoinLobby = createAsyncThunk<services.EntryLobbyResponse, number>(
  LOBBY_ACTION_TYPE.LOBBY_UNJOIN,
  async (params, { rejectWithValue }) => {
    try {
      await services.unjoin(params)
      const data = {
        data: params,
        status: 'success',
      }
      return data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const cancelLobby = createAsyncThunk<services.EntryLobbyResponse, number>(
  LOBBY_ACTION_TYPE.LOBBY_CANCEL,
  async (params, { rejectWithValue }) => {
    try {
      await services.cancel(params)
      const data = {
        data: params,
        status: 'success',
      }
      return data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const searchLobby = createAsyncThunk<services.LobbySearchResponse, services.LobbySearchParams>(
  LOBBY_ACTION_TYPE.LOBBY_SEARCH,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.search(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearLobbyResult = createAction(LOBBY_ACTION_TYPE.CLEAR_LOBBY_RESULT)

export const getParticipants = createAsyncThunk<services.ParticipantsResponse, number>(
  LOBBY_ACTION_TYPE.LOBBY_PARTICIPANTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.participants(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const createLobby = createAsyncThunk<services.CreateLobbyResponse, services.LobbyUpsertParams>(
  LOBBY_ACTION_TYPE.LOBBY_CREATE,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.createLobby(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateLobby = createAsyncThunk<services.UpdateLobbyResponse, services.UpdateParams>(
  LOBBY_ACTION_TYPE.LOBBY_UPDATE,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.updateLobby(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getLobbyDetail = createAsyncThunk<services.LobbyDetailResponse, string | string[]>(
  LOBBY_ACTION_TYPE.LOBBY_DETAIL,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getLobbyDetail(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getLobbyCategories = createAsyncThunk<services.LobbyCategoriesResponse, void>(
  LOBBY_ACTION_TYPE.LOBBY_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.getLobbyCategories()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
