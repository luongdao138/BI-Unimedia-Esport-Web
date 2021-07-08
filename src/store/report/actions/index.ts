import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/report.service'
import { REPORT_ACTION_TYPE } from './types'

export const postReport = createAsyncThunk<services.ReportResponse, services.ReportParams>(
  REPORT_ACTION_TYPE.REPORT,
  async (reportParam, { rejectWithValue }) => {
    try {
      const res = await services.createReport(reportParam)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getReportReasons = createAsyncThunk<services.ReasonsResponse, services.ReasonsParams>(
  REPORT_ACTION_TYPE.REPORT_REASONS,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getReportReasons(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
