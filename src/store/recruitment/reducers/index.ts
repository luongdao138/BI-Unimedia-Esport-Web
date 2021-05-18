import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'

type StateType = {
  recommendations: Array<any>
  recruitmentFollowers: Array<any>
}

const initialState: StateType = { recommendations: [], recruitmentFollowers: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getRecommendations.fulfilled, (state, action) => {
    state.recommendations = action.payload.data
  })
  builder.addCase(actions.getRecruitmentFollowers.fulfilled, (state, action) => {
    state.recruitmentFollowers = action.payload.data
  })
})
