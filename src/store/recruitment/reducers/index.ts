import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { Meta } from '@services/recruitment.service'

type StateType = {
  recommendations: Array<any>
  recommendationsMeta?: Meta
  recruitmentFollowers: Array<any>
  recruitmentFollowersMeta?: Meta
}

const initialState: StateType = {
  recommendations: [],
  recruitmentFollowers: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getRecommendations.fulfilled, (state, action) => {
    let tempRecommendations = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tempRecommendations = state.recommendations.concat(action.payload.data)
    }
    state.recommendations = tempRecommendations
    state.recommendationsMeta = action.payload.meta
  })
  builder.addCase(actions.getRecruitmentFollowers.fulfilled, (state, action) => {
    let tmpRecruitmentFollowers = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpRecruitmentFollowers = state.recruitmentFollowers.concat(action.payload.data)
    }
    state.recruitmentFollowers = tmpRecruitmentFollowers
    state.recruitmentFollowersMeta = action.payload.meta
  })
})
