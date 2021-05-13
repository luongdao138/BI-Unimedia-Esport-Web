import { createReducer } from '@reduxjs/toolkit'
import { ProfileResponse } from '@services/user.service'
import * as actions from '../actions'
import { HistoryResponse, Nickname2, Meta } from '@services/user.service'

type StateType = {
  detail: ProfileResponse
  tournamentHistories?: Array<HistoryResponse>
  tournamentHistoriesMeta?: Meta
  activityLogs?: Array<any>
  nicknames2?: Array<Nickname2>
}

const initialState: StateType = { detail: undefined, tournamentHistories: [], activityLogs: [], nicknames2: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getUserProfile.fulfilled, (state, action) => {
    state.detail = action.payload
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

  builder.addCase(actions.getNicknames.fulfilled, (state, action) => {
    state.nicknames2 = action.payload.data.attributes.nicknames
  })
})
