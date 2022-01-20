import { createReducer } from '@reduxjs/toolkit'
import { FinancialStatementData, FinancialStatementDetailData } from '@services/financial.service'
import * as actions from '../actions'

type FinancialStateType = {
  financialStatement: FinancialStatementData
  financialStatementDetail: FinancialStatementDetailData
}

const initialState: FinancialStateType = {
  financialStatement: null,
  financialStatementDetail: null,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.fetchFinancialStatement.fulfilled, (state, action) => {
    state.financialStatement = action.payload?.data
  })
  //reset financial statement data
  builder.addCase(actions.resetFinancialStatement, (state) => {
    state.financialStatement = null
  })

  builder.addCase(actions.fetchFinancialStatementDetail.fulfilled, (state, action) => {
    state.financialStatementDetail = action.payload?.data
  })
  //reset financial statement detail data
  builder.addCase(actions.resetFinancialStatementDetail, (state) => {
    state.financialStatementDetail = null
  })
})
