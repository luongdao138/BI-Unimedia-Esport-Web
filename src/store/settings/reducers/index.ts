import * as actions from '../actions'
import { UserFeaturesResponse } from '@services/settings.service'
import { createReducer } from '@reduxjs/toolkit'
import { GameTitlesResponse } from '../../../services/settings.service'

type StateType = {
  userFeatures: UserFeaturesResponse
  allGameTitles: GameTitlesResponse
}

const initialState: StateType = { userFeatures: [], allGameTitles: [] }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getFeatures.fulfilled, (state, action) => {
      const userFeatures = action.payload
      state.userFeatures = userFeatures
    })
    .addCase(actions.getAllGameTitles.fulfilled, (state, action) => {
      const allTitles = action.payload
      state.allGameTitles = allTitles
    })
})
