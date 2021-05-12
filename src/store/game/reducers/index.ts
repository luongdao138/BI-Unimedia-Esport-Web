import { createReducer } from '@reduxjs/toolkit'
import { GameGenreResponse, GameTitleResponse } from '@services/game.service'
import * as actions from '../actions'

type StateType = {
  genres: GameGenreResponse['data']
  games: GameTitleResponse['data']
}

const initialState: StateType = { genres: [], games: [] }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getGameGenres.fulfilled, (state, action) => {
      state.genres = action.payload.data
    })
    .addCase(actions.getGameByGenreId.fulfilled, (state, action) => {
      state.games = action.payload.data
    })
    .addCase(actions.getGameByTitle.fulfilled, (state, action) => {
      state.games = action.payload.data
    })
    .addCase(actions.clearGameTitles, (state) => {
      state.games = []
    })
})
