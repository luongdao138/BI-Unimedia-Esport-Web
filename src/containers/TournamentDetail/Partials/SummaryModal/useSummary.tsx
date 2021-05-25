import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/tournament/actions'
import { SummaryParams } from '@services/tournament.service'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const _summaryMeta = createMetaSelector(actions.summaryTournament)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSummary = (): {
  summary: (param: SummaryParams) => void
  summaryMeta: Meta
  resetSummaryMeta: () => void
} => {
  const dispatch = useAppDispatch()
  const summary = (param: SummaryParams) => dispatch(actions.summaryTournament(param))
  const summaryMeta = useAppSelector(_summaryMeta)
  const resetSummaryMeta = () => dispatch(clearMetaData(actions.summaryTournament.typePrefix))
  return { summary, summaryMeta, resetSummaryMeta }
}

export default useSummary
