import { createReducer } from '@reduxjs/toolkit'
import { ProfileResponse } from '@services/user.service'
import * as actions from '../actions'
import { HistoryResponse, Meta } from '@services/user.service'

type StateType = {
  data: ProfileResponse['data']
  tournamentHistories?: Array<HistoryResponse>
  tournamentHistoriesMeta?: Meta
  activityLogs?: Array<any>
  recommendations: Array<any>
}

const initialState: StateType = { data: undefined, tournamentHistories: [], activityLogs: [], recommendations: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getUserProfile.fulfilled, (state, action) => {
    state.data = action.payload.data
  })

  builder.addCase(actions.profileUpdate.fulfilled, (state, action) => {
    state.data.attributes = { ...state.data.attributes, ...action.payload.data.attributes }
  })

  builder.addCase(actions.tournamentHistorySearch.fulfilled, (state, action) => {
    let tmpHistories = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      tmpHistories = state.tournamentHistories.concat(action.payload.data)
    }

    state.tournamentHistories = tmpHistories
    state.tournamentHistoriesMeta = action.payload.links?.meta
  })

  builder.addCase(actions.getActivityLogs.fulfilled, (state, action) => {
    state.activityLogs = action.payload.data
  })

  builder.addCase(actions.getRecommendations.fulfilled, (state, action) => {
    state.recommendations = action.payload.data
  })
})
