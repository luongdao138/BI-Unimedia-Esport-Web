import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/lobby.service'
import { SEARCH_ACTION_TYPE, TOURNAMENT_ACTION_TYPE, CLEAR_RECOMMENDED_USERS, CLEAR_TOURNAMENT_RESULT } from './types'
import * as types from './types'

export const tournamentSearch = createAsyncThunk<services.LobbySearchResponse, services.LobbySearchParams>(
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

export const getTournamentFollowers = createAsyncThunk<services.LobbyFollowersResponse, services.LobbyFollowersParams>(
  TOURNAMENT_ACTION_TYPE.TOURNAMENT_FOLLOWERS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getLobbyFollowers(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentResults = createAsyncThunk<services.LobbyResultsResponse, services.LobbyResultsParams>(
  TOURNAMENT_ACTION_TYPE.TOURNAMENT_RESULTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getLobbyResults(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getRecruitingTournaments = createAsyncThunk<services.RecruitingLobbyResponse, services.RecruitingLobbyParams>(
  TOURNAMENT_ACTION_TYPE.RECRUITING_TOURNAMENT,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getRecruitingLobbys(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentDetail = createAsyncThunk<services.LobbyDetailResponse, string | string[]>(
  types.GET_TOURNAMENT_DETAIL,
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

export const joinTournament = createAsyncThunk<{ team_id: number | null }, services.JoinParams>(
  types.JOIN_TOURNAMENT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.joinLobby(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const leaveTournament = createAsyncThunk<void, string>(types.LEAVE_TOURNAMENT, async (param, { rejectWithValue }) => {
  try {
    const res = await services.leaveLobby(param)
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
    const res = await services.closeLobby(param)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const cancelTournament = createAsyncThunk<void, string>(types.CANCEL_TOURNAMENT, async (param, { rejectWithValue }) => {
  try {
    const res = await services.cancelLobby(param)
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
      const res = await services.getLobbyParticipants(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetParticipants = createAction(types.RESET_TOURNAMENT_PARTICIPANTS)

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
      const res = await services.getLobbyInteresteds(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentMatches = createAsyncThunk<services.LobbyMatchResponse, string>(
  types.GET_TOURNAMENT_MATCHES,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getLobbyMatches(param)
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
  types.GET_ARENA_WINNERS,
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
export const clearTournamentResult = createAction(CLEAR_TOURNAMENT_RESULT)

export const createTournament = createAsyncThunk<services.CreateLobbyResponse, services.LobbyFormParams>(
  types.CREATE_TOURNAMENT,
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

export const updateTournament = createAsyncThunk<services.UpdateLobbyResponse, services.UpdateParams>(
  types.UPDATE_TOURNAMENT,
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
    const res = await services.randomizeLobby(param)
    return res
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})

export const freezeTournament = createAsyncThunk<services.LobbyDetailResponse, string>(
  types.FREEZE_TOURNAMENT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.freezeLobby(param)
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
      const res = await services.summaryLobby(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getParticipantName = createAsyncThunk<services.ParticipantNameResponse, services.ParticipantNameParam>(
  types.GET_PARTICIPANT_NAME,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getParticipantName(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const changeParticipantName = createAsyncThunk<{ name: string }, services.ParticipantNameParams>(
  types.CHANGE_PARTICIPANT_NAME,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.changeParticipantName(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTournamentTeamDetail = createAsyncThunk<services.LobbyTeamDetailResponse, number>(
  types.GET_TOURNAMENT_TEAM_DETAIL,
  async (teamId, { rejectWithValue }) => {
    try {
      const res = await services.getLobbyTeamDetail(teamId)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateTournamentTeamDetail = createAsyncThunk<void, services.UpdateLobbyTeamParams>(
  types.UPDATE_TOURNAMENT_TEAM_DETAIL,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.updateLobbyTeamDetail(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
