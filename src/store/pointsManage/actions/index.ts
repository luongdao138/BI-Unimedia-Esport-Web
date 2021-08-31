import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/points.service'
import { POINT_MANAGE_ACTION_TYPE } from './types'

export const getMyPointData = createAsyncThunk<services.ListMyPointsResponse, services.ListPointsParams>(
  POINT_MANAGE_ACTION_TYPE.GET_LIST_MY_POINTS,
  async (myPointParams, { rejectWithValue }) => {
    try {
      const res = await services.ListMyPoints(myPointParams)
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
      // eslint-disable-next-line no-console
      console.log('pointHistoryParams >>>>>>>>>>>>>>', pointHistoryParams)
      const res = await services.ListHistoryPoints(pointHistoryParams)
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
      const res = await services.ListUsedPoints(usedPointParams)
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
      const res = await services.ListUsagePointsHistoryDetail(detailParams)
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
