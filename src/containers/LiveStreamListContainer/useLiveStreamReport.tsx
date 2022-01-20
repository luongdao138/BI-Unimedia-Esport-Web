import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import streamStore from '@store/stream'
import { LiveStreamReportParams } from '@services/liveStream.service'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

const { selectors, actions } = streamStore
const getLiveStreamReportMeta = createMetaSelector(actions.getLiveStreamReport)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveStreamReport = () => {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const liveStreamReport = useAppSelector(selectors.getLiveStreamReportSelector)
  const meta = useAppSelector(getLiveStreamReportMeta)
  const itemLiveStreamReport = liveStreamReport?.data?.item ? liveStreamReport?.data?.item : {}
  const [convertListDates, setConvertListDates] = useState([t('live_stream_list_screen.current_month')])

  useEffect(() => {
    if (Array.isArray(liveStreamReport?.data?.list_dates)) {
      if (liveStreamReport?.data?.list_dates.length > 0) {
        let currentMonth = liveStreamReport.data.list_dates[0]
        currentMonth = t('live_stream_list_screen.current_month')
        const listDates = [currentMonth, ...liveStreamReport?.data?.list_dates.slice(1)]
        setConvertListDates(listDates)
      }
    }
  }, [liveStreamReport?.data?.list_dates])

  const sortOptionsListDates = convertListDates
  const fetchLiveStreamReportData = (param: LiveStreamReportParams) => {
    dispatch(actions.getLiveStreamReport(param))
  }

  return { fetchLiveStreamReportData, sortOptionsListDates, itemLiveStreamReport, meta }
}

export default useLiveStreamReport
