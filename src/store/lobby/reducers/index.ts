import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ParticipantsData } from '@services/lobby.service'

type StateType = {
  detail: any // change type
  participants: ParticipantsData
}

const initialState: StateType = {
  detail: undefined,
  participants: undefined,
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
  builder.addCase(actions.getParticipants.fulfilled, (state, action) => {
    state.participants = action.payload.data
    // do detail manipulation later
  })
})
