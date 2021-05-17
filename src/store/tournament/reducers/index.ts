import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { TournamentResponse, Meta, FollowersResponse, ResultsResponse, TournamentDetail } from '@services/tournament.service'

type StateType = {
  searchTournaments?: Array<TournamentResponse>
  searchTournamentsMeta?: Meta
  tournamentFollowers: Array<FollowersResponse>
  tournamentResults: Array<ResultsResponse>
  tournamentDetail?: TournamentDetail
}

const initialState: StateType = { searchTournaments: [], tournamentFollowers: [], tournamentResults: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.tournamentSearch.fulfilled, (state, action) => {
    let searchTournaments = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      searchTournaments = state.searchTournaments.concat(action.payload.data)
    }

    state.searchTournaments = searchTournaments
    state.searchTournamentsMeta = action.payload.links?.meta
  })
  builder.addCase(actions.tournamentFollowers.fulfilled, (state, action) => {
    state.tournamentFollowers = action.payload.data
  })
  builder.addCase(actions.tournamentResults.fulfilled, (state, action) => {
    state.tournamentResults = action.payload.data
  })
  builder.addCase(actions.getTournamentDetail.fulfilled, (state, action) => {
    state.tournamentDetail = action.payload.data
  })
})
