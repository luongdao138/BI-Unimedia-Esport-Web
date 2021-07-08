import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import searchStore from '@store/arena'
import { TournamentResponse, TournamentSearchParams, PageMeta, TournamentFilterOption } from '@services/arena.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = searchStore
const getTournamentSearchMeta = createMetaSelector(actions.tournamentSearch)

const useArenaHome = (): {
  arenas: TournamentResponse[]
  meta: Meta
  page: PageMeta
  loadMore: () => void
  onFilterChange: (filter: TournamentFilterOption) => void
} => {
  const dispatch = useAppDispatch()
  const arenas = useAppSelector(selectors.getSearchTournaments)
  const page = useAppSelector(selectors.getSearchTournamentsMeta)
  const meta = useAppSelector(getTournamentSearchMeta)
  const tournamentSearch = (param: TournamentSearchParams) => dispatch(actions.tournamentSearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.tournamentSearch.typePrefix))
  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      tournamentSearch({ page: page.current_page + 1, keyword: '' })
    }
  }

  const onFilterChange = (filter: TournamentFilterOption) => {
    dispatch(actions.clearTournamentResult())
    tournamentSearch({ page: 1, keyword: '', filter: filter })
  }

  useEffect(() => {
    tournamentSearch({ page: 1, keyword: '' })
    return () => resetMeta()
  }, [])
  return { arenas, meta, page, loadMore, onFilterChange }
}

export default useArenaHome
