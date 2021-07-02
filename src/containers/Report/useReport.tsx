import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { getUserEmail } from '@store/userProfile/selectors'
import reportStore from '@store/report'
import { ReportParams } from '@services/report.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { actions } = reportStore
const getMeta = createMetaSelector(actions.postReport)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useReport = (): { meta: Meta; userEmail?: string | null; createReport: (params: ReportParams) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const userEmail = useAppSelector(getUserEmail)
  // const userEmail = '1409387843693158400@twitter.com'
  const createReport = (param: ReportParams) => dispatch(actions.postReport(param))

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.postReport.typePrefix))
    }
  }, [])
  return {
    meta,
    userEmail,
    createReport,
  }
}

export default useReport
