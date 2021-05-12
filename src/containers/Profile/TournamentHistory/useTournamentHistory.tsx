import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'
import { HistorySearchParams } from '@services/user.service'

const { selectors, actions } = userProfile
const getTournamentHistorySearchMeta = createMetaSelector(actions.tournamentHistorySearch)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentHistory = () => {
  const dispatch = useAppDispatch()
  const tournamentHistories = useAppSelector(selectors.getTourHistories)
  const page = useAppSelector(selectors.getTourHistoriesMeta)
  const meta = useAppSelector(getTournamentHistorySearchMeta)
  const tournamentHistory = (param: HistorySearchParams) => dispatch(actions.tournamentHistorySearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.tournamentHistorySearch.typePrefix))
  return { tournamentHistories, tournamentHistory, resetMeta, meta, page }
}

export default useTournamentHistory
