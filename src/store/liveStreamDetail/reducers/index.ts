import { createReducer } from '@reduxjs/toolkit'
import { RankingsItem, TypeVideoArchived } from '@services/liveStreamDetail.service'
import * as actions from '../actions'

type StateType = {
  videoArchived?: Array<TypeVideoArchived>
  videoRelated?: Array<TypeVideoArchived>
  reactionData?: any
  followData?: any
  videoWatchTimeReport?: any
  miniVideoVisible?: boolean
  rankings: {
    giver: Array<RankingsItem>
    receive: Array<RankingsItem>
  }
}
const initialState: StateType = {
  videoArchived: [],
  videoRelated: [],
  reactionData: null,
  followData: null,
  videoWatchTimeReport: null,
  miniVideoVisible: false,
  rankings: {
    giver: [],
    receive: [],
  },
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.changeMiniVideoPlayerState, (state, action) => {
    state.miniVideoVisible = action.payload
  })
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
  // request video watch time report
  builder.addCase(actions.videoWatchTimeReportRequest.fulfilled, (state, action) => {
    state.videoWatchTimeReport = action.payload
  })
  // get ranking video
  builder.addCase(actions.getRankingList.fulfilled, (state, action) => {
    state.rankings.giver = action.payload.data.giver
    state.rankings.receive = action.payload.data.receive
  })
})
