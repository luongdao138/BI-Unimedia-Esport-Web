import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'

type StateType = {
  recommendations: Array<any>
}

const initialState: StateType = { recommendations: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getRecommendations.fulfilled, (state, action) => {
    state.recommendations = action.payload.data
  })
})
