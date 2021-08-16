import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import { SummaryParams } from '@services/arena.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'

const _summaryMeta = createMetaSelector(actions.summaryTournament)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSummary = (): {
  summary: (param: SummaryParams) => void
  summaryMeta: Meta
  resetSummaryMeta: () => void
} => {
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const summary = (param: SummaryParams) => dispatch(actions.summaryTournament(param))
  const summaryMeta = useAppSelector(_summaryMeta)
  const resetSummaryMeta = () => dispatch(clearMetaData(actions.summaryTournament.typePrefix))

  useEffect(() => {
    if (summaryMeta.error) {
      dispatch(commonActions.addToast(t('common:error.failed')))
      resetSummaryMeta()
    }
  }, [summaryMeta.error])

  return { summary, summaryMeta, resetSummaryMeta }
}

export default useSummary
