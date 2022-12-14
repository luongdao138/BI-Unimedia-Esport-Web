import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/lobby.service'
import {
  CLEAR_LOBBY_DETAIL,
  CLEAR_LOBBY_RECENTS,
  CLEAR_LOBBY_RECOMMENDED,
  LOBBY_ACTION_TYPE,
  RESET_LOBBY_ALL_PARTICIPANTS,
  RESET_LOBBY_PARTICIPANTS,
} from './types'
import { follow, FollowActionResponse, FollowParams, unfollow, UnFollowResponse } from '@services/user.service'
import { UnblockParams, UnblockResponse, unblockUser } from '@services/block.service'
import { AppDispatch } from '@store/store'

export const entryLobby = createAsyncThunk<services.EntryLobbyResponse, string>(
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

export const unjoinLobby = createAsyncThunk<services.EntryLobbyResponse, string>(
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

export const cancelLobby = createAsyncThunk<services.EntryLobbyResponse, string>(
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

export const resetSearchLobbies = createAction(LOBBY_ACTION_TYPE.RESET_SEARCH_LOBBIES)
export const clearLobbyResult = createAction(LOBBY_ACTION_TYPE.CLEAR_LOBBY_RESULT)

export const getParticipants = createAsyncThunk<services.ParticipantsResponse, services.ParticipantParams>(
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

export const getAllParticipants = createAsyncThunk<services.AllParticipantsResponse, services.AllParticipantParams>(
  LOBBY_ACTION_TYPE.LOBBY_ALL_PARTICIPANTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getAllParticipants(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const randomizeParticipants = createAsyncThunk<services.ParticipantsResponse, string>(
  LOBBY_ACTION_TYPE.LOBBY_RANDOMIZE_PARTICIPANTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.randomizeParticipants(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const confirmParticipants = createAsyncThunk<void, services.ConfirmParticipantParams>(
  LOBBY_ACTION_TYPE.LOBBY_CONFIRM_PARTICIPANTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.confirmParticipants(params)
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

export const fetchBeforeRandomize = (params: services.AllParticipantParams) => async (dispatch: AppDispatch): Promise<any> => {
  Promise.resolve(dispatch(getAllParticipants(params))).then(() => dispatch(randomizeParticipants(params.hash_key)))
}

export const resetParticipants = createAction(RESET_LOBBY_PARTICIPANTS)
export const resetAllParticipants = createAction(RESET_LOBBY_ALL_PARTICIPANTS)

export const lobbyFollow = createAsyncThunk<FollowActionResponse, FollowParams>(
  LOBBY_ACTION_TYPE.LOBBY_FOLLOW,
  async (params, { rejectWithValue }) => {
    try {
      const res = await follow(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const lobbyUnfollow = createAsyncThunk<UnFollowResponse, FollowParams>(
  LOBBY_ACTION_TYPE.LOBBY_UNFOLLOW,
  async (params, { rejectWithValue }) => {
    try {
      const res = await unfollow(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const lobbyUnblock = createAsyncThunk<UnblockResponse, UnblockParams>(
  LOBBY_ACTION_TYPE.LOBBY_UNBLOCK,
  async (params, { rejectWithValue }) => {
    try {
      const res = await unblockUser(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const clearLobbyDetail = createAction(CLEAR_LOBBY_DETAIL)

export const getDetailWithClear = (hashKey: string) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: AppDispatch) => {
    Promise.resolve(dispatch(clearLobbyDetail())).then(() => dispatch(getLobbyDetail(hashKey)))
  }
}

export const getRecentLobbies = createAsyncThunk<services.LobbySearchResponse, services.RecentLobbiesParams>(
  LOBBY_ACTION_TYPE.LOBBY_RECENTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getRecentLobbies(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const clearLobbyRecents = createAction(CLEAR_LOBBY_RECENTS)

export const getRecommendedLobbies = createAsyncThunk<services.LobbySearchResponse, services.RecommendedLobbiesParams>(
  LOBBY_ACTION_TYPE.LOBBY_RECOMMENDED,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.getRecommendedLobbies(params)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const clearLobbyRecommended = createAction(CLEAR_LOBBY_RECOMMENDED)
