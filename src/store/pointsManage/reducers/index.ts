import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ListMyPointsData, ListHistoryPointsData, ListUsedPointsData } from '@services/points.service'

type StateType = {
  list_my_points: {
    total_point: string
    aggregate_points: Array<ListMyPointsData>
  }
  list_history_points: Array<ListHistoryPointsData>
  list_used_points: Array<ListUsedPointsData>
}

const initialState: StateType = {
  list_my_points: null,
  list_history_points: [],
  list_used_points: [],
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
})
