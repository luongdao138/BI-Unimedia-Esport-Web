import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/tournament.service'
import { SEARCH_ACTION_TYPE, TOURNAMENT_ACTION_TYPE } from './types'

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
