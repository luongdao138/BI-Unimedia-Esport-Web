import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ParticipantsData, PageMeta, LobbyResponse } from '@services/lobby.service'

type StateType = {
  detail: any // change type
  participants: ParticipantsData
  searchLobbies?: Array<LobbyResponse>
  searchLobbiesMeta?: PageMeta
}

const initialState: StateType = {
  detail: undefined,
  participants: undefined,
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
    let searchLobbies = _action.payload.data
    if (_action.payload.meta != undefined && _action.payload.meta.current_page > 1) {
      searchLobbies = _state.searchLobbies.concat(_action.payload.data)
    }

    _state.searchLobbies = searchLobbies
    _state.searchLobbiesMeta = _action.payload.meta
  })
  builder.addCase(actions.resetSearchLobbies, (state) => {
    state.searchLobbies = []
    state.searchLobbiesMeta = undefined
  })
  builder.addCase(actions.clearLobbyResult, (state) => {
    state.searchLobbies = []
  })
  builder.addCase(actions.getParticipants.fulfilled, (state, action) => {
    state.participants = action.payload.data
    // do detail manipulation later
  })
})
