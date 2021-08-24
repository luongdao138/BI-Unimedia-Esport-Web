import { createReducer } from '@reduxjs/toolkit'
import { CategoryPopularData, TypeVideo } from '@services/videoTop.services'
import * as actions from '../actions'

type StateType = {
  listVideoAll?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archive?: Array<TypeVideo>
  }
  listVideoPopular?: Array<CategoryPopularData>
}
const initialState: StateType = {
  listVideoAll: {
    live: [],
    schedule: [],
    archive: [],
  },
  listVideoPopular: [],
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getListVideoAll.fulfilled, (state, action) => {
    const listVideo = action.payload.data
    state.listVideoAll = listVideo
  })
  builder.addCase(actions.getCategoryPopularVideo.fulfilled, (state, action) => {
    const videoPopular = action.payload.data
    state.listVideoPopular = videoPopular
  })
})
