import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ParticipantsData, PageMeta, LobbyResponse, CategoryItem, LobbyDetail, ParticipantsItem } from '@services/lobby.service'

type StateType = {
  detail: LobbyDetail // change type
  participants: ParticipantsData
  recommendedParticipants: ParticipantsData
  searchLobbies?: Array<LobbyResponse>
  searchLobbiesMeta?: PageMeta
  lobbyCategories: CategoryItem['attributes'][]
  lobbyDetail?: LobbyDetail
  participantsMeta?: PageMeta
}

const initialState: StateType = {
  detail: undefined,
  participants: undefined,
  recommendedParticipants: [],
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
    // do detail manipulation later
    let _participants = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _participants = state.participants.concat(action.payload.data)
    }
    state.participants = _participants
    state.participantsMeta = action.payload.meta
  })
  builder.addCase(actions.randomizeParticipants.fulfilled, (state, action) => {
    state.recommendedParticipants = action.payload.data
    // do detail manipulation later
  })
  builder.addCase(actions.confirmParticipants.fulfilled, (state) => {
    state.recommendedParticipants = []
    // do detail manipulation later
  })
  builder.addCase(actions.getLobbyCategories.fulfilled, (state, action) => {
    state.lobbyCategories = action.payload.data.map((g) => ({
      id: g.attributes.id,
      name: g.attributes.name,
    }))
  })
  builder.addCase(actions.getLobbyDetail.fulfilled, (state, action) => {
    state.lobbyDetail = action.payload.data
  })
  builder.addCase(actions.lobbyFollow.pending, (state, action) => {
    state.participants = state.participants.map((member: ParticipantsItem) => {
      if (member.attributes.user_code !== action.meta.arg.user_code) return { ...member }
      return Object.assign(
        {},
        {
          ...member,
          pending: true,
        }
      )
    })
  })
  builder.addCase(actions.lobbyFollow.fulfilled, (state, action) => {
    state.participants = state.participants.map((member: ParticipantsItem) => {
      if (member.attributes.user_code !== action.meta.arg.user_code) return { ...member }
      return Object.assign(
        {},
        {
          ...member,
          pending: false,
          attributes: {
            ...member.attributes,
            is_followed: true,
          },
        }
      )
    })
  })
  builder.addCase(actions.lobbyUnfollow.pending, (state, action) => {
    state.participants = state.participants.map((member: ParticipantsItem) => {
      if (member.attributes.user_code !== action.meta.arg.user_code) return { ...member }
      return Object.assign(
        {},
        {
          ...member,
          pending: true,
        }
      )
    })
  })
  builder.addCase(actions.lobbyUnfollow.fulfilled, (state, action) => {
    state.participants = state.participants.map((member: ParticipantsItem) => {
      if (member.attributes.user_code !== action.meta.arg.user_code) return { ...member }
      return Object.assign(
        {},
        {
          ...member,
          pending: false,
          attributes: {
            ...member.attributes,
            is_followed: false,
          },
        }
      )
    })
  })
  builder.addCase(actions.lobbyUnblock.pending, (state, action) => {
    state.participants = state.participants.map((member: ParticipantsItem) => {
      if (member.attributes.user_code !== action.meta.arg.user_code) return { ...member }
      return Object.assign(
        {},
        {
          ...member,
          pending: true,
        }
      )
    })
  })
  builder.addCase(actions.lobbyUnblock.fulfilled, (state, action) => {
    state.participants = state.participants.map((member: ParticipantsItem) => {
      if (member.attributes.user_code !== action.meta.arg.user_code) return { ...member }
      return Object.assign(
        {},
        {
          ...member,
          pending: false,
          attributes: {
            ...member.attributes,
            is_blocked: false,
          },
        }
      )
    })
  })
})
