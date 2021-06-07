import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import searchStore from '@store/arena'
import { TournamentSearchParams } from '@services/arena.service'

const { selectors, actions } = searchStore
const getTournamentSearchMeta = createMetaSelector(actions.tournamentSearch)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTournamentSearch = () => {
  const dispatch = useAppDispatch()
  const searchTournaments = useAppSelector(selectors.getSearchTournaments)
  const page = useAppSelector(selectors.getSearchTournamentsMeta)
  const meta = useAppSelector(getTournamentSearchMeta)
  const tournamentSearch = (param: TournamentSearchParams) => dispatch(actions.tournamentSearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.tournamentSearch.typePrefix))
  const resetSearchTournaments = () => dispatch(actions.resetSearchTournaments())
  return { searchTournaments, tournamentSearch, resetMeta, resetSearchTournaments, meta, page }
}

export default useTournamentSearch
