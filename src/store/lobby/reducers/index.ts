import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'

type StateType = {
  detail: any // change type
}

const initialState: StateType = {
  detail: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.entryLobby.fulfilled, (_state, _action) => {
    // do detail manipulation later
  })
  builder.addCase(actions.cancelLobby.fulfilled, (_state, _action) => {
    // do detail manipulation later
  })
  builder.addCase(actions.unjoinLobby.fulfilled, (_state, _action) => {
    // do detail manipulation later
  })
})
