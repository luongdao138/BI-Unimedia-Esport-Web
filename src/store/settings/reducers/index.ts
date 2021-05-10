import * as actions from '../actions'
import { UserFeaturesResponse } from '@services/settings.service';
import { createReducer } from '@reduxjs/toolkit';

type StateType = {
  userFeatures: UserFeaturesResponse
}


const initialState: StateType = { userFeatures: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getFeatures.fulfilled, (state, action) => {
    const userFeatures = action.payload
    state.userFeatures = userFeatures
  })
})
