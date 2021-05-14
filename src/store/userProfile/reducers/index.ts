import { createReducer } from '@reduxjs/toolkit'
import { ProfileResponse } from '@services/user.service'
import * as actions from '../actions'
import { HistoryResponse, Nickname2, Meta } from '@services/user.service'

type StateType = {
  data: ProfileResponse['data']
  lastSeenUserData: ProfileResponse['data']
  tournamentHistories?: Array<HistoryResponse>
  tournamentHistoriesMeta?: Meta
  activityLogs?: Array<any>
  recommendations: Array<any>
  nicknames2?: Array<Nickname2>
}

const initialState: StateType = {
  data: undefined,
  lastSeenUserData: undefined,
  tournamentHistories: [],
  activityLogs: [],
  recommendations: [],
  nicknames2: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getUserProfile.fulfilled, (state, action) => {
    state.data = action.payload.data
  })

  builder.addCase(actions.getMemberProfile.fulfilled, (state, action) => {
    state.lastSeenUserData = action.payload.data
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

  builder.addCase(actions.getNicknames.fulfilled, (state, action) => {
    state.nicknames2 = action.payload.data.attributes.nicknames
  })

  builder.addCase(actions.profileEdit.fulfilled, (state, action) => {
    state.data = action.payload.data
  })

  builder.addCase(actions.gameEdit.fulfilled, (state, action) => {
    state.data = action.payload.data
  })

  builder.addCase(actions.getRecommendations.fulfilled, (state, action) => {
    state.recommendations = action.payload.data
  })
})
