import { HistoryPointsParams, ListPointsParams, DetailUsagePointParams } from '@services/points.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
// import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import pointsManage from '@store/pointsManage'

const { selectors, actions } = pointsManage
const _getMyPointData = createMetaSelector(actions.getMyPointData)
const _getListHistoryPoints = createMetaSelector(actions.getListHistoryPoints)
const _getListUsedPoints = createMetaSelector(actions.getListUsedPoints)
const _getDetailUsagePointsHistory = createMetaSelector(actions.getDetailUsagePoint)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePointsManage = () => {
  const dispatch = useAppDispatch()
  const myPointsData = useAppSelector(selectors.getListMyPointData)
  const historyPointsData = useAppSelector(selectors.getListHistoryPoint)
  const usedPointsData = useAppSelector(selectors.getListUsedPoint)
  const usagePointsHistoryDetail = useAppSelector(selectors.getDetailUsagePointsHistory)

  const meta_my_points = useAppSelector(_getMyPointData)
  const meta_history_points = useAppSelector(_getListHistoryPoints)
  const meta_used_points = useAppSelector(_getListUsedPoints)
  const meta_used_points_detail = useAppSelector(_getDetailUsagePointsHistory)

  const getMyPointData = (params: ListPointsParams) => dispatch(actions.getMyPointData(params))
  const getHistoryPointData = (params: HistoryPointsParams) => dispatch(actions.getListHistoryPoints(params))
  const getUsedPointData = (params: HistoryPointsParams) => dispatch(actions.getListUsedPoints(params))
  const getUsagePointsHistoryData = (params: DetailUsagePointParams) => dispatch(actions.getDetailUsagePoint(params))
  const resetDetailUsagePointsHistory = () => dispatch(actions.resetDetailUsagePointsHistory())
  const resetMyPointsActive = () => dispatch(actions.resetPointsActive())
  const resetPointsHistory = () => dispatch(actions.resetPointsHistory())
  const resetUsagePoints = () => dispatch(actions.resetUsagePoints())

  return {
    myPointsData,
    historyPointsData,
    usedPointsData,
    usagePointsHistoryDetail,
    meta_my_points,
    meta_history_points,
    meta_used_points,
    meta_used_points_detail,
    getMyPointData,
    getHistoryPointData,
    getUsedPointData,
    getUsagePointsHistoryData,
    resetDetailUsagePointsHistory,
    resetUsagePoints,
    resetPointsHistory,
    resetMyPointsActive,
  }
}

export default usePointsManage
