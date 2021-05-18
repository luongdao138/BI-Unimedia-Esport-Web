import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/tournament.service'
import { SEARCH_ACTION_TYPE, TOURNAMENT_ACTION_TYPE } from './types'
import * as types from './types'

export const tournamentSearch = createAsyncThunk<services.TournamentSearchResponse, services.TournamentSearchParams>(
  SEARCH_ACTION_TYPE.TOURNAMENT_SEARCH,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.tournamentSearch(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const tournamentFollowers = createAsyncThunk<services.TournamentFollowersResponse>(
  TOURNAMENT_ACTION_TYPE.TOURNAMENT_FOLLOWERS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.tournamentFollowers()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const tournamentResults = createAsyncThunk<services.TournamentResultsResponse>(
  TOURNAMENT_ACTION_TYPE.TOURNAMENT_RESULTS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await services.tournamentResults()
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentDetail = createAsyncThunk<services.TournamentDetailResponse, string>(
  types.GET_TOURNAMENT_DETAIL,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getTournamentDetail(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getEntryStatus = createAsyncThunk<services.EntryStatusResponse, string>(
  types.GET_ENTRY_STATUS,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getEntryStatus(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const joinTournament = createAsyncThunk<undefined, string>(types.JOIN_TOURNAMENT, async (param, { rejectWithValue }) => {
  try {
    const res = await services.joinTournament(param)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const leaveTournament = createAsyncThunk<undefined, string>(types.LEAVE_TOURNAMENT, async (param, { rejectWithValue }) => {
  try {
    const res = await services.leaveTournament(param)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})
