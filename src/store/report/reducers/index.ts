import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { Reason, Meta } from '@services/report.service'

type StateType = {
  reasons?: Array<Reason>
  reasonsMeta?: Meta
}

const initialState: StateType = { reasons: [] }

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getReportReasons.fulfilled, (state, action) => {
    let tmpReasons = action.payload.data
    if (action.payload.meta != undefined && action.payload.meta.current_page > 1) {
      tmpReasons = state.reasons.concat(action.payload.data)
    }

    state.reasons = tmpReasons
    state.reasonsMeta = action.payload.meta
  })
})
