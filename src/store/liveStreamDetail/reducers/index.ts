import { createReducer } from '@reduxjs/toolkit'
import { TypeVideoArchived } from '@services/liveStreamDetail.service'
import * as actions from '../actions'

type StateType = {
  videoArchived?: Array<TypeVideoArchived>
  videoRelated?: Array<TypeVideoArchived>
  reactionData?: any
  followData?: any
}
const initialState: StateType = {
  videoArchived: [],
  videoRelated: [],
  reactionData: null,
  followData: null,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getListArchivedVideoStream.fulfilled, (state, action) => {
    let listVideoArchived = action.payload.data
    if (action.meta.arg.page > 1) {
      listVideoArchived = state.videoArchived.concat(action.payload.data)
    }
    state.videoArchived = listVideoArchived
  })

  builder.addCase(actions.resetArchivedVideoStream, (state) => {
    state.videoArchived = []
  })

  builder.addCase(actions.getListRelatedVideoStream.fulfilled, (state, action) => {
    let listVideoRelated = action.payload.data
    if (action.meta.arg.page > 1) {
      listVideoRelated = state.videoRelated.concat(action.payload.data)
    }
    state.videoRelated = listVideoRelated
  })

  builder.addCase(actions.resetRelatedVideoStream, (state) => {
    state.videoRelated = []
  })

  builder.addCase(actions.reactionVideoStream.fulfilled, (state, action) => {
    const reactionVideoResult = action.payload
    state.reactionData = reactionVideoResult
  })

  builder.addCase(actions.followChannelAction.fulfilled, (state, action) => {
    const followData = action.payload
    state.followData = followData
  })
})
