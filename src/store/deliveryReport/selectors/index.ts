import { RootState } from '@store/store'
import { createSelector } from 'reselect'

const getRoot = (state: RootState) => state.deliveryReport

export const getTipReportList = createSelector(getRoot, (state) => state.tipReport)
export const getTicketReportList = createSelector(getRoot, (state) => state.ticketReport)
export const getDetailedReportList = createSelector(getRoot, (state) => state.detailedReport)
