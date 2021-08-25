import { ListPointsParams } from '@services/points.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
// import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import pointsManage from '@store/pointsManage'

const { selectors, actions } = pointsManage
const _getMyPointData = createMetaSelector(actions.getMyPointData)
const _getListHistoryPoints = createMetaSelector(actions.getListHistoryPoints)
const _getListUsedPoints = createMetaSelector(actions.getListUsedPoints)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePointsManage = () => {
  const dispatch = useAppDispatch()
  const myPointsData = useAppSelector(selectors.getListMyPointData)
  const historyPointsData = useAppSelector(selectors.getListHistoryPoint)
  const usedPointsData = useAppSelector(selectors.getListUsedPoint)

  const meta_my_points = useAppSelector(_getMyPointData)
  const meta_history_points = useAppSelector(_getListHistoryPoints)
  const meta_used_points = useAppSelector(_getListUsedPoints)

  const getMyPointData = (params: ListPointsParams) => dispatch(actions.getMyPointData(params))
  const getHistoryPointData = (params: ListPointsParams) => dispatch(actions.getListHistoryPoints(params))
  const getUsedPointData = (params: ListPointsParams) => dispatch(actions.getListUsedPoints(params))

  return {
    myPointsData,
    historyPointsData,
    usedPointsData,
    meta_my_points,
    meta_history_points,
    meta_used_points,
    getMyPointData,
    getHistoryPointData,
    getUsedPointData,
  }
}

export default usePointsManage
