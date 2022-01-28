import { createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/deliveryReport.service'
import { ACTION_DELIVERY_REPORT } from './types'

export const getTipReportList = createAsyncThunk<services.TipReportResponse, services.TipReportParams>(
  ACTION_DELIVERY_REPORT.TIP_REPORT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.tipReportList(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTicketReportList = createAsyncThunk<services.TicketReportResponse, services.TicketReportParams>(
  ACTION_DELIVERY_REPORT.TICKET_REPORT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.ticketReportList(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getDetailedReportList = createAsyncThunk<services.DetailedReportResponse, services.DetailedReportParams>(
  ACTION_DELIVERY_REPORT.DETAILED_REPORT,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.detailedReportList(param)
      return res
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
