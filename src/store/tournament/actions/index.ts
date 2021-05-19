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

export const getTournamentFollowers = createAsyncThunk<services.TournamentFollowersResponse>(
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

export const getTournamentResults = createAsyncThunk<services.TournamentResultsResponse>(
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

export const joinTournament = createAsyncThunk<void, services.JoinParams>(types.JOIN_TOURNAMENT, async (param, { rejectWithValue }) => {
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

export const leaveTournament = createAsyncThunk<void, string>(types.LEAVE_TOURNAMENT, async (param, { rejectWithValue }) => {
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

export const getTournamentParticipants = createAsyncThunk<services.GetParticipantsResponse, services.GetParticipantsParams>(
  types.GET_TOURNAMENT_PARTICIPANTS,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getTournamentParticipants(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getSuggestedTeamMembers = createAsyncThunk<services.GetSuggestedTeamMembersResponse, services.GetSuggestedTeamMembersParams>(
  types.GET_SUGGESTED_TEAM_MEMBERS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getSuggestedTeamMembers(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentInteresteds = createAsyncThunk<services.GetParticipantsResponse, services.GetParticipantsParams>(
  types.GET_TOURNAMENT_INTERESTEDS,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getTournamentInteresteds(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentMatches = createAsyncThunk<services.TournamentMatchResponse, string>(
  types.GET_TOURNAMENT_MATCHES,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getTournamentMatches(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
