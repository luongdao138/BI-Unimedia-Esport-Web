import { createReducer } from '@reduxjs/toolkit'
import { GameGenreResponse, GameTitle } from '@services/game.service'
import * as actions from '../actions'

type StateType = {
  genres: GameGenreResponse['data']
  games: GameTitle['attributes'][]
  createdGame?: GameTitle['attributes']
}

const initialState: StateType = { genres: [], games: [] }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getGameGenres.fulfilled, (state, action) => {
      state.genres = action.payload.data
    })
    .addCase(actions.getGameByGenreId.fulfilled, (state, action) => {
      state.games = action.payload.data.map((g) => ({
        id: Number(g.id),
        display_name: g.attributes.display_name,
        en_name: g.attributes.en_name,
        jp_kana_name: g.attributes.jp_kana_name,
        short_name: g.attributes.short_name,
      }))
    })
    .addCase(actions.getGameByTitle.fulfilled, (state, action) => {
      state.games = action.payload.data.map((g) => ({
        id: Number(g.id),
        display_name: g.attributes.display_name,
        en_name: g.attributes.en_name,
        jp_kana_name: g.attributes.jp_kana_name,
        short_name: g.attributes.short_name,
      }))
    })
    .addCase(actions.createGameTitle.fulfilled, (state, action) => {
      const g: GameTitle = action.payload.data
      state.createdGame = {
        id: Number(g.id),
        display_name: g.attributes.display_name,
        en_name: g.attributes.en_name,
        jp_kana_name: g.attributes.jp_kana_name,
        short_name: g.attributes.short_name,
      }
    })
    .addCase(actions.clearGameTitles, (state) => {
      state.games = []
    })
})
