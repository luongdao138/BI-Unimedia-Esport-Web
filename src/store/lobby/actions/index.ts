import { createAsyncThunk } from '@reduxjs/toolkit'
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
