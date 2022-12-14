import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { ParticipantsData, PageMeta, LobbyListItem, CategoryItem, LobbyDetail, ParticipantsItem } from '@services/lobby.service'
import _ from 'lodash'

type StateType = {
  participants: ParticipantsData
  allParticipants: ParticipantsData
  recommendedParticipants: ParticipantsData
  searchLobbies?: Array<LobbyListItem>
  searchLobbiesMeta?: PageMeta
  lobbyCategories: CategoryItem['attributes'][]
  lobbyDetail?: LobbyDetail
  participantsMeta?: PageMeta
  recentLobbies?: Array<LobbyListItem>
  recentLobbiesPageMeta?: PageMeta
  recommendedLobbies?: Array<LobbyListItem>
  recommendedLobbiesPageMeta?: PageMeta
}

const initialState: StateType = {
  participants: [],
  allParticipants: [],
  recommendedParticipants: [],
  searchLobbies: [],
  lobbyCategories: [],
  recentLobbies: [],
  recommendedLobbies: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.searchLobby.fulfilled, (_state, _action) => {
    let searchLobbies = _action.payload.data
    if (_action.payload.meta != undefined && _action.payload.meta.current_page > 1) {
      searchLobbies = _.unionBy(_state.searchLobbies, searchLobbies, 'attributes.hash_key')
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
    let _participants = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      _participants = state.participants.concat(action.payload.data)
    }
    state.participants = _participants
    state.participantsMeta = action.payload.meta
  })
  builder.addCase(actions.getAllParticipants.fulfilled, (state, action) => {
    state.allParticipants = action.payload.data
  })
  builder.addCase(actions.randomizeParticipants.fulfilled, (state, action) => {
    state.recommendedParticipants = action.payload.data
  })
  builder.addCase(actions.confirmParticipants.fulfilled, (state) => {
    state.recommendedParticipants = []
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
  builder.addCase(actions.clearLobbyDetail, (state, _) => {
    state.lobbyDetail = undefined
  })
  builder.addCase(actions.resetParticipants, (state, _) => {
    state.participants = []
    state.recommendedParticipants = []
  })
  builder.addCase(actions.resetAllParticipants, (state, _) => {
    state.allParticipants = []
  })
  builder.addCase(actions.getRecentLobbies.fulfilled, (state, action) => {
    let recentLobbies = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      recentLobbies = _.unionBy(state.recentLobbies, recentLobbies, 'attributes.hash_key')
    }
    state.recentLobbies = recentLobbies
    state.recentLobbiesPageMeta = action.payload.meta
  })
  builder.addCase(actions.clearLobbyRecents, (state, _) => {
    state.recentLobbies = []
    state.recentLobbiesPageMeta = undefined
  })
  builder.addCase(actions.getRecommendedLobbies.fulfilled, (state, action) => {
    let recommendedLobbies = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      recommendedLobbies = _.unionBy(state.recommendedLobbies, recommendedLobbies, 'attributes.hash_key')
    }
    state.recommendedLobbies = recommendedLobbies
    state.recommendedLobbiesPageMeta = action.payload.meta
  })
  builder.addCase(actions.clearLobbyRecommended, (state, _) => {
    state.recommendedLobbies = []
    state.recommendedLobbiesPageMeta = undefined
  })
})
