import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ListMyPointsData, ListHistoryPointsData, ListUsedPointsData, ListUsagePointHistoryData } from '@services/points.service'

type StateType = {
  list_my_points: {
    total: number
    total_point: number
    aggregate_points: Array<ListMyPointsData>
  }
  list_history_points: {
    date_by_points: Array<string>
    total: number
    points: Array<ListHistoryPointsData>
  }
  list_used_points: {
    date_use_points: Array<string>
    total: number
    points: Array<ListUsedPointsData>
  }
  detail_usage_points_history: {
    uuid: string
    point: number
    valid_until: string
    created_at: string
    total: number
    point_history: Array<ListUsagePointHistoryData>
  }
}
const initialState: StateType = {
  list_my_points: null,
  list_history_points: null,
  list_used_points: null,
  detail_usage_points_history: null,
}

export default createReducer(initialState, (builder) => {
  // get data my points
  builder.addCase(actions.getMyPointData.fulfilled, (state, action) => {
    const listMyPoints = action.payload.data
    state.list_my_points = listMyPoints
  })
  // get list history data points
  builder.addCase(actions.getListHistoryPoints.fulfilled, (state, action) => {
    const listHistoryPoints = action.payload.data
    state.list_history_points = listHistoryPoints
  })
  // get list used data points
  builder.addCase(actions.getListUsedPoints.fulfilled, (state, action) => {
    const listUsedPoints = action.payload.data
    state.list_used_points = listUsedPoints
  })
  // get detail usage points history
  builder.addCase(actions.getDetailUsagePoint.fulfilled, (state, action) => {
    const listUsedPoints = action.payload.data.purchase_point
    state.detail_usage_points_history = listUsedPoints
  })
})
