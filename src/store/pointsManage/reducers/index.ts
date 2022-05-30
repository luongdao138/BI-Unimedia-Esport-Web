import { createReducer } from '@reduxjs/toolkit'
import * as actions from '@store/pointsManage/actions'
import {
  ListMyPointsData,
  ListHistoryPointsData,
  ListUsedPointsData,
  ListUsagePointHistoryData,
  MultiPaymentPurchaseResponse,
} from '@services/points.service'
import * as authActions from '@store/auth/actions'

type StateType = {
  list_my_points: {
    total: number
    total_point: number
    aggregate_points: Array<ListMyPointsData>
  }
  list_history_points: {
    date_by_points: Array<string>
    total: number
    points: Array<ListHistoryPointsData>
  }
  list_used_points: {
    date_use_points: Array<string>
    total: number
    points: Array<ListUsedPointsData>
  }
  detail_usage_points_history: {
    uuid: string
    point: number
    valid_until: string
    created_at: string
    total: number
    point_history: Array<ListUsagePointHistoryData>
  }
  purchase_ticket_super_chat: {
    message?: string
    code?: number
    data?: Array<any>
  }
  multi_payment: MultiPaymentPurchaseResponse
  multi_payment_loading: boolean
}
const initialState: StateType = {
  list_my_points: null,
  list_history_points: null,
  list_used_points: null,
  detail_usage_points_history: null,
  purchase_ticket_super_chat: null,
  multi_payment: null,
  multi_payment_loading: false,
}

export default createReducer(initialState, (builder) => {
  // get data my points
  builder.addCase(actions.getMyPointData.fulfilled, (state, action) => {
    const listMyPoints = action.payload.data
    state.list_my_points = listMyPoints
  })
  //reset my points active
  builder.addCase(actions.resetPointsActive, (state) => {
    state.list_my_points = null
  })
  // get list history data points
  builder.addCase(actions.getListHistoryPoints.fulfilled, (state, action) => {
    const listHistoryPoints = action.payload.data
    state.list_history_points = listHistoryPoints
  })
  //reset points history
  builder.addCase(actions.resetPointsHistory, (state) => {
    state.list_history_points = null
  })
  // get list used data points
  builder.addCase(actions.getListUsedPoints.fulfilled, (state, action) => {
    const listUsedPoints = action.payload.data
    state.list_used_points = listUsedPoints
  })
  //reset usage points
  builder.addCase(actions.resetUsagePoints, (state) => {
    state.list_used_points = null
  })
  // get detail usage points history
  builder.addCase(actions.getDetailUsagePoint.fulfilled, (state, action) => {
    const listUsedPoints = action.payload.data.purchase_point
    state.detail_usage_points_history = listUsedPoints
  })
  //reset detail usage points history
  builder.addCase(actions.resetDetailUsagePointsHistory, (state) => {
    state.detail_usage_points_history = null
  })
  // purchase ticket super chat
  builder
    .addCase(actions.purchaseTicketSuperChat.fulfilled, (state, action) => {
      const purchaseTicket = action.payload
      state.purchase_ticket_super_chat = purchaseTicket
    })
    .addCase(actions.requestMultiPaymentPurchase.pending, (state, _) => {
      state.multi_payment_loading = true
    })
    .addCase(actions.requestMultiPaymentPurchase.fulfilled, (state, action) => {
      state.multi_payment = action.payload
      state.multi_payment_loading = false
    })
    .addCase(actions.requestMultiPaymentPurchase.rejected, (state, _) => {
      state.multi_payment_loading = false
    })
    // logout clear data point
    .addCase(authActions.logout.fulfilled, (state) => {
      state.list_my_points = null
      state.list_used_points = null
      state.list_history_points = null
      state.detail_usage_points_history = null
    })
    .addCase(actions.clearPurchaseTicket, (state) => {
      state.purchase_ticket_super_chat = null
    })
})
