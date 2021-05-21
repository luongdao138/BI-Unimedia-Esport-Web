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

export const getTournamentFollowers = createAsyncThunk<services.TournamentFollowersResponse, services.TournamentFollowersParams>(
  TOURNAMENT_ACTION_TYPE.TOURNAMENT_FOLLOWERS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getTournamentFollowers(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentResults = createAsyncThunk<services.TournamentResultsResponse, services.TournamentResultsParams>(
  TOURNAMENT_ACTION_TYPE.TOURNAMENT_RESULTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getTournamentResults(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getRecruitingTournaments = createAsyncThunk<services.RecruitingTournamentResponse, services.RecruitingTournamentParams>(
  TOURNAMENT_ACTION_TYPE.RECRUITING_TOURNAMENT,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getRecruitingTournaments(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
