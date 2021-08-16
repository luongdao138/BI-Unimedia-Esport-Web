import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ParticipantsData, PageMeta, LobbyResponse, CategoryItem, LobbyDetail } from '@services/lobby.service'

type StateType = {
  detail: any // change type
  participants: ParticipantsData
  searchLobbies?: Array<LobbyResponse>
  searchLobbiesMeta?: PageMeta
  lobbyCategories: CategoryItem['attributes'][]
  lobbyDetail?: LobbyDetail
}

const initialState: StateType = {
  detail: undefined,
  participants: undefined,
  searchLobbies: [],
  lobbyCategories: [],
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
  builder.addCase(actions.clearLobbyResult, (state) => {
    state.searchLobbies = []
  })
  builder.addCase(actions.getParticipants.fulfilled, (state, action) => {
    state.participants = action.payload.data
    // do detail manipulation later
  })
  builder.addCase(actions.getLobbyCategories.fulfilled, (state, action) => {
    state.lobbyCategories = action.payload.data.map((g) => ({
      id: g.attributes.id,
      name: g.attributes.name,
    }))
  })
})
