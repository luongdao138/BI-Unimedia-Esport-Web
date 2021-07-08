import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'
import { HistorySearchParams, Meta as Page } from '@services/user.service'
import { TournamentListItem } from '@services/arena.service'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = userProfile
const getTournamentHistorySearchMeta = createMetaSelector(actions.tournamentHistorySearch)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentHistory = (): {
  tournamentHistories: Array<TournamentListItem> | []
  tournamentHistory: (param: HistorySearchParams) => void
  clearTournamentHistory: () => void
  resetMeta: () => void
  meta: Meta
  page: Page
} => {
  const dispatch = useAppDispatch()
  const tournamentHistories = useAppSelector(selectors.getTourHistories)
  const page = useAppSelector(selectors.getTourHistoriesMeta)
  const meta = useAppSelector(getTournamentHistorySearchMeta)
  const tournamentHistory = (param: HistorySearchParams) => dispatch(actions.tournamentHistorySearch(param))
  const clearTournamentHistory = () => dispatch(actions.clearTournamentHistory())
  const resetMeta = () => dispatch(clearMetaData(actions.tournamentHistorySearch.typePrefix))
  return { tournamentHistories, tournamentHistory, clearTournamentHistory, resetMeta, meta, page }
}

export default useTournamentHistory
