import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import searchStore from '@store/lobby'
import { PageMeta, LobbyFilterOption, LobbySearchParams, LobbyListItem } from '@services/lobby.service'
import { Meta } from '@store/metadata/actions/types'
import { DateHelper } from '@utils/helpers/DateHelper'

const { selectors, actions } = searchStore
const getTournamentSearchMeta = createMetaSelector(actions.searchLobby)

const useLobbyHome = (): {
  lobbies: LobbyListItem[]
  meta: Meta
  page: PageMeta
  loadMore: () => void
  onFilterChange: (filter: LobbyFilterOption) => void
  selectedFilter: LobbyFilterOption
  setSelectedFilter: (filter: LobbyFilterOption) => void
} => {
  const dispatch = useAppDispatch()
  const lobbies = useAppSelector(selectors.getSearchLobbies)
  const page = useAppSelector(selectors.getSearchLobbiesMeta)
  const meta = useAppSelector(getTournamentSearchMeta)
  const [selectedFilter, setSelectedFilter] = useState(LobbyFilterOption.all)
  const lobbySearch = (param: LobbySearchParams) => dispatch(actions.searchLobby(param))
  const resetMeta = () => {
    dispatch(clearMetaData(actions.searchLobby.typePrefix))
    dispatch(actions.resetSearchLobbies())
  }
  const loadMore = () => {
    if (page && page.current_page < page.total_pages) {
      lobbySearch({ page: page.current_page + 1, keyword: '', filter: selectedFilter, timezone: DateHelper.getTimezone() })
    }
  }

  const onFilterChange = (filter: LobbyFilterOption) => {
    setSelectedFilter(filter)
    dispatch(actions.clearLobbyResult())
    lobbySearch({ page: 1, keyword: '', filter: filter, timezone: DateHelper.getTimezone() })
  }

  useEffect(() => {
    return () => resetMeta()
  }, [])

  return { lobbies, meta, page, loadMore, onFilterChange, selectedFilter, setSelectedFilter }
}

export default useLobbyHome
