import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { TournamentResponse, Meta, FollowersResponse, ResultsResponse, RecruitingResponse } from '@services/tournament.service'

type StateType = {
  searchTournaments?: Array<TournamentResponse>
  searchTournamentsMeta?: Meta
  tournamentFollowers: Array<FollowersResponse>
  tournamentResults: Array<ResultsResponse>
  recruitingTournaments: Array<RecruitingResponse>
  tournamentFollowersMeta: Meta
  tournamentResultsMeta: Meta
  recruitingTournamentsMeta: Meta
}

const initialState: StateType = {
  searchTournaments: [],
  tournamentFollowers: [],
  tournamentResults: [],
  recruitingTournaments: [],
  tournamentFollowersMeta: undefined,
  tournamentResultsMeta: undefined,
  recruitingTournamentsMeta: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.tournamentSearch.fulfilled, (state, action) => {
    let searchTournaments = action.payload.data
    if (action.payload.links != undefined && action.payload.links.meta.current_page > 1) {
      searchTournaments = state.searchTournaments.concat(action.payload.data)
    }

    state.searchTournaments = searchTournaments
    state.searchTournamentsMeta = action.payload.links?.meta
  })
  builder.addCase(actions.getTournamentFollowers.fulfilled, (state, action) => {
    let tmpTournamentFollowers = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpTournamentFollowers = state.tournamentFollowers.concat(action.payload.data)
    }
    state.tournamentFollowers = tmpTournamentFollowers
    state.tournamentFollowersMeta = action.payload.meta
  })
  builder.addCase(actions.getTournamentResults.fulfilled, (state, action) => {
    let tmpTournamentResults = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpTournamentResults = state.tournamentResults.concat(action.payload.data)
    }
    state.tournamentResults = tmpTournamentResults
    state.tournamentResultsMeta = action.payload.meta
  })
  builder.addCase(actions.getRecruitingTournaments.fulfilled, (state, action) => {
    let tmpRecruitingTournaments = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpRecruitingTournaments = state.recruitingTournaments.concat(action.payload.data)
    }
    state.recruitingTournaments = tmpRecruitingTournaments
    state.recruitingTournamentsMeta = action.payload.meta
  })
})
