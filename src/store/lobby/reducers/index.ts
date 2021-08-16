import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { PageMeta, LobbyResponse } from '@services/lobby.service'

type StateType = {
  detail: any // change type
  searchLobbies?: Array<LobbyResponse>
  searchLobbiesMeta?: PageMeta
}

const initialState: StateType = {
  detail: undefined,
  searchLobbies: [],
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
  builder.addCase(actions.searchLobby.fulfilled, (_state, _action) => {
    // do detail manipulation later
  })
})
