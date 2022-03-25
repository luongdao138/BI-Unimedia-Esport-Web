import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import * as services from '@services/financial.service'
import { getTimeZone } from '@utils/helpers/CommonHelper'
import { FINANCIAL_STATEMENT_ACTION_TYPE } from './types'

export const resetFinancialStatement = createAction(FINANCIAL_STATEMENT_ACTION_TYPE.RESET_FINANCIAL_STATEMENT)
export const resetFinancialStatementDetail = createAction(FINANCIAL_STATEMENT_ACTION_TYPE.RESET_FINANCIAL_STATEMENT_DETAIL)

export const fetchFinancialStatement = createAsyncThunk<services.FinancialStatementResponse, services.FinancialStatementParams>(
  FINANCIAL_STATEMENT_ACTION_TYPE.FETCH_FINANCIAL_STATEMENT,
  async (financialStatementParams, { rejectWithValue }) => {
    try {
      const res = await services.fetchFinancialStatement({ ...financialStatementParams, timezone: getTimeZone() })
      if (res?.code === 200) {
        return res
      } else {
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchFinancialStatementDetail = createAsyncThunk<
  services.FinancialStatementDetailResponse,
  services.FinancialStatementDetailParams
>(FINANCIAL_STATEMENT_ACTION_TYPE.FETCH_FINANCIAL_STATEMENT_DETAIL, async (financialStatementDetailParams, { rejectWithValue }) => {
  try {
    const res = await services.fetchFinancialStatementDetail({ ...financialStatementDetailParams, timezone: getTimeZone() })
    if (res?.code === 200) {
      return res
    } else {
      return rejectWithValue(JSON.stringify(res.message))
    }
  } catch (error) {
    if (!error.response) {
      throw error
    }
    return rejectWithValue(error.response.data)
  }
})
