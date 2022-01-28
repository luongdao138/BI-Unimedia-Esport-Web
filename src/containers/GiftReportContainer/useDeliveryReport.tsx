import { useAppDispatch, useAppSelector } from '@store/hooks'
// import { useTranslation } from 'react-i18next'
import { DetailedReportParams, TicketReportParams, TipReportParams } from '@services/deliveryReport.service'
import deliveryReport from '@store/deliveryReport'
import { createMetaSelector } from '@store/metadata/selectors'

const { selectors, actions } = deliveryReport

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

const getTipReportMeta = createMetaSelector(actions.getTipReportList)
const getTicketReportListMeta = createMetaSelector(actions.getTicketReportList)
const getDetailedReportListMeta = createMetaSelector(actions.getDetailedReportList)

const useDeliveryReport = () => {
  // const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const tipReports = useAppSelector(selectors.getTipReportList)
  const ticketReports = useAppSelector(selectors.getTicketReportList)
  const detailedReports = useAppSelector(selectors.getDetailedReportList)
  const tipReportMeta = useAppSelector(getTipReportMeta)
  const ticketReportMeta = useAppSelector(getTicketReportListMeta)
  const detailedReportMeta = useAppSelector(getDetailedReportListMeta)

  const fetchTipReportList = (param: TipReportParams) => {
    dispatch(actions.getTipReportList(param))
  }

  const fetchTicketReportList = (param: TicketReportParams) => {
    dispatch(actions.getTicketReportList(param))
  }

  const fetchDetailedReportList = (param: DetailedReportParams) => {
    dispatch(actions.getDetailedReportList(param))
  }

  return {
    fetchTipReportList,
    fetchTicketReportList,
    fetchDetailedReportList,
    tipReports,
    ticketReports,
    detailedReports,
    tipReportMeta,
    ticketReportMeta,
    detailedReportMeta,
  }
}

export default useDeliveryReport
