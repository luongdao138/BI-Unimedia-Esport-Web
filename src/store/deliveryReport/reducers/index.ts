import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { DetailedResponse, GiftsResponse, TicketsResponse } from '@services/deliveryReport.service'

type StateType = {
  tipReport: {
    total: number
    gifts?: GiftsResponse[]
  }
  ticketReport: {
    total: number
    tickets?: TicketsResponse[]
  }
  detailedReport: {
    total: number
    points?: DetailedResponse[]
  }
}

const initialState: StateType = {
  tipReport: {
    total: 0,
    gifts: [],
  },
  ticketReport: {
    total: 0,
    tickets: [],
  },
  detailedReport: {
    total: 0,
    points: [],
  },
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getTipReportList.fulfilled, (state, action) => {
    const tipReport = action.payload.data
    state.tipReport = tipReport
  })

  builder.addCase(actions.getTicketReportList.fulfilled, (state, action) => {
    const ticketReportList = action.payload.data
    state.ticketReport = ticketReportList
  })

  builder.addCase(actions.getDetailedReportList.fulfilled, (state, action) => {
    const detailedReportList = action.payload.data
    state.detailedReport = detailedReportList
  })
})
