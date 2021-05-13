import { createReducer } from '@reduxjs/toolkit'
import { ProfileResponse } from '@services/user.service'
import * as actions from '../actions'
import { HistoryResponse, Meta } from '@services/user.service'

type StateType = {
  detail: ProfileResponse
  tournamentHistories?: Array<HistoryResponse>
  tournamentHistoriesMeta?: Meta
  activityLogs?: Array<any>
}

const initialState: StateType = { detail: undefined, tournamentHistories: [], activityLogs: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getUserProfile.fulfilled, (state, action) => {
    state.detail = action.payload
  })

  builder.addCase(actions.profileUpdate.fulfilled, (state, action) => {
    state.detail.data.attributes = { ...state.detail.data.attributes, ...action.payload.data.attributes }
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
})
