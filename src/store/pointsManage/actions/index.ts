import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/points.service'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import { POINT_MANAGE_ACTION_TYPE } from './types'

export const resetPointsActive = createAction(POINT_MANAGE_ACTION_TYPE.RESET_LIST_POINTS_ACTIVE)
export const resetPointsHistory = createAction(POINT_MANAGE_ACTION_TYPE.RESET_POINTS_HISTORY)
export const resetUsagePoints = createAction(POINT_MANAGE_ACTION_TYPE.RESET_USAGE_POINTS)
export const resetDetailUsagePointsHistory = createAction(POINT_MANAGE_ACTION_TYPE.RESET_DETAIL_USAGE_POINTS_HISTORY)

export const getMyPointData = createAsyncThunk<services.ListMyPointsResponse, services.ListPointsParams>(
  POINT_MANAGE_ACTION_TYPE.GET_LIST_MY_POINTS,
  async (myPointParams, { rejectWithValue }) => {
    try {
      const res = await services.ListMyPoints({ ...myPointParams, timezone: getTimeZone() })
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getListHistoryPoints = createAsyncThunk<services.PointHistoryResponse, services.HistoryPointsParams>(
  POINT_MANAGE_ACTION_TYPE.GET_LIST_HISTORY_POINTS,
  async (pointHistoryParams, { rejectWithValue }) => {
    try {
      const res = await services.ListHistoryPoints({ ...pointHistoryParams, timezone: getTimeZone() })
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
export const getListUsedPoints = createAsyncThunk<services.PointUsedResponse, services.HistoryPointsParams>(
  POINT_MANAGE_ACTION_TYPE.GET_LIST_USED_POINTS,
  async (usedPointParams, { rejectWithValue }) => {
    try {
      const res = await services.ListUsedPoints({ ...usedPointParams, timezone: getTimeZone() })
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getDetailUsagePoint = createAsyncThunk<services.PointUsedDetailResponse, services.DetailUsagePointParams>(
  POINT_MANAGE_ACTION_TYPE.GET_DETAIL_USAGE_POINTS_HISTORY,
  async (detailParams, { rejectWithValue }) => {
    try {
      const res = await services.ListUsagePointsHistoryDetail({ ...detailParams, timezone: getTimeZone() })
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const purchaseTicketSuperChat = createAsyncThunk<services.PurchaseTicketResponse, services.PurchaseTicketParams>(
  POINT_MANAGE_ACTION_TYPE.PURCHASE_TICKET_SUPER_CHAT,
  async (purchaseParams, { rejectWithValue }) => {
    try {
      const res = await services.PurchaseTicketSuperChat(purchaseParams)
      if (res?.code === 200) {
        return res
      } else {
        // throw res.message
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
