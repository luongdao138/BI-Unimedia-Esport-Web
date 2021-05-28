import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import reportStore from '@store/report'
import { ReasonsParams } from '@services/report.service'

const { selectors, actions } = reportStore

const getMeta = createMetaSelector(actions.getReportReasons)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReasons = () => {
  const dispatch = useAppDispatch()
  const reasons = useAppSelector(selectors.getReasons)
  const page = useAppSelector(selectors.getReasonsMeta)
  const meta = useAppSelector(getMeta)
  const fetchReasons = (param: ReasonsParams) => dispatch(actions.getReportReasons(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getReportReasons.typePrefix))

  return { reasons, fetchReasons, resetMeta, meta, page }
}

export default useReasons
