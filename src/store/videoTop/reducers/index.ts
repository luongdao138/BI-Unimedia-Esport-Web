import { createReducer } from '@reduxjs/toolkit'
import { TypeVideo } from '@services/videoTop.services'
import * as actions from '../actions'

type StateType = {
  listVideoAll?: {
    live?: Array<TypeVideo>
    schedule?: Array<TypeVideo>
    archive?: Array<TypeVideo>
  }
}
const initialState: StateType = {
  listVideoAll: {
    live: [],
    schedule: [],
    archive: [],
  },
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getListVideoAll.fulfilled, (state, action) => {
    const listVideo = action.payload.data
    state.listVideoAll = listVideo
  })
})
