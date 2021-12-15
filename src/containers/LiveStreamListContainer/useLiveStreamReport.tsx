import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import streamStore from '@store/stream'
import { LiveStreamReportParams } from '@services/liveStream.service'
import { useTranslation } from 'react-i18next'

const { selectors, actions } = streamStore
const getLiveStreamReportMeta = createMetaSelector(actions.getLiveStreamReport)

function checkNotNull(value) {
  if (value === null) {
    return []
  }
  return value
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveStreamReport = () => {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const liveStreamReport = useAppSelector(selectors.getLiveStreamReportSelector)
  const meta = useAppSelector(getLiveStreamReportMeta)
  const itemLiveStreamReport = liveStreamReport?.data?.item ? liveStreamReport?.data?.item : {}
  const dateByVideos = liveStreamReport?.data?.date_by_videos
  const sortOptionsDateByVideos = [t('point_management_tab.choosing'), ...checkNotNull(dateByVideos)]

  const fetchLiveStreamReportData = (param: LiveStreamReportParams) => {
    dispatch(actions.getLiveStreamReport(param))
  }

  return { fetchLiveStreamReportData, sortOptionsDateByVideos, itemLiveStreamReport, meta }
}

export default useLiveStreamReport
