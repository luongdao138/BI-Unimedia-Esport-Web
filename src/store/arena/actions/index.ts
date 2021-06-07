import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/arena.service'
import { SEARCH_ACTION_TYPE, TOURNAMENT_ACTION_TYPE, CLEAR_RECOMMENDED_USERS } from './types'
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

export const resetSearchTournaments = createAction(SEARCH_ACTION_TYPE.RESET_SEARCH_TOURNAMENTS)

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

export const getTournamentDetail = createAsyncThunk<services.TournamentDetailResponse, string | string[]>(
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

export const closeTournament = createAsyncThunk<void, string>(types.CLOSE_TOURNAMENT, async (param, { rejectWithValue }) => {
  try {
    const res = await services.closeTournament(param)
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

export const setParticipant = createAsyncThunk<void, services.SetParticipantParams>(
  types.SET_TOURNAMENT_PARTICIPANT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.setParticipant(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const setParticipants = createAsyncThunk<void, services.SetParticipantsParams>(
  types.SET_ARENA_PARTICIPANTS,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.setParticipants(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getArenaWinners = createAsyncThunk<services.GetArenaWinnersResponse, string | string[]>(
  types.SET_TOURNAMENT_PARTICIPANT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getArenaWinners(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const getRecommendedUsersByName = createAsyncThunk<services.RecommendedUsersResponse, services.RecommendedUsersParams>(
  types.GET_RECOMMENDED_USERS,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getRecommendedUsersByName(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearRecommendedUsers = createAction(CLEAR_RECOMMENDED_USERS)

export const createTournament = createAsyncThunk<void, services.TournamentFormParams>(
  types.CREATE_TOURNAMENT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.createTournament(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateTournament = createAsyncThunk<void, services.UpdateParams>(
  types.UPDATE_TOURNAMENT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.updateTournament(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const setScore = createAsyncThunk<void, services.SetScoreParams>(types.SET_TOURNAMENT_SCORE, async (param, { rejectWithValue }) => {
  try {
    const res = await services.setScore(param)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const randomizeTournament = createAsyncThunk<void, string>(types.RANDOMIZE_TOURNAMENT, async (param, { rejectWithValue }) => {
  try {
    const res = await services.randomizeTournament(param)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const freezeTournament = createAsyncThunk<services.TournamentDetailResponse, string>(
  types.FREEZE_TOURNAMENT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.freezeTournament(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const summaryTournament = createAsyncThunk<void, services.SummaryParams>(
  types.SUMMARY_TOURNAMENT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.summaryTournament(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
