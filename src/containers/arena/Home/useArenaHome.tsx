import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import searchStore from '@store/arena'
import { TournamentSearchParams, PageMeta, TournamentFilterOption } from '@services/arena.service'
import { TournamentListFiltered } from '@components/TournamentCard'
import { useEffect, useState } from 'react'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = searchStore
const getTournamentSearchMeta = createMetaSelector(actions.tournamentSearch)

const useArenaHome = (): {
  arenas: TournamentListFiltered[]
  meta: Meta
  page: PageMeta
  loadMore: () => void
  onFilterChange: (filter: TournamentFilterOption) => void
  selectedFilter: TournamentFilterOption
  setSelectedFilter: (filter: TournamentFilterOption) => void
} => {
  const dispatch = useAppDispatch()
  const arenas = useAppSelector(selectors.getSearchFilteredTournaments)
  const page = useAppSelector(selectors.getSearchTournamentsMeta)
  const meta = useAppSelector(getTournamentSearchMeta)
  const [selectedFilter, setSelectedFilter] = useState(TournamentFilterOption.all)
  const tournamentSearch = (param: TournamentSearchParams) => dispatch(actions.tournamentSearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.tournamentSearch.typePrefix))
  const loadMore = () => {
    if (page && page.current_page < page.total_pages) {
      tournamentSearch({ page: page.current_page + 1, keyword: '', filter: selectedFilter })
    }
  }

  const onFilterChange = (filter: TournamentFilterOption) => {
    setSelectedFilter(filter)
    dispatch(actions.clearTournamentResult())
    tournamentSearch({ page: 1, keyword: '', filter: filter })
  }

  useEffect(() => {
    return () => resetMeta()
  }, [])
  return { arenas, meta, page, loadMore, onFilterChange, selectedFilter, setSelectedFilter }
}

export default useArenaHome
