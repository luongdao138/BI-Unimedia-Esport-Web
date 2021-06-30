import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { NgWordsResponse } from '@services/ngWords.service'

type StateType = {
  words?: NgWordsResponse
}

const initialState: StateType = {}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getNgWords.fulfilled, (state, action) => {
    state.words = action.payload
  })
})
