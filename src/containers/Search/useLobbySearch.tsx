import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import searchStore from '@store/lobby'
import { PageMeta, LobbySearchParams, LobbyListItem } from '@services/lobby.service'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = searchStore
const getLobbySearchMeta = createMetaSelector(actions.searchLobby)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLobbySearch = (): {
  searchLobbies: LobbyListItem[]
  meta: Meta
  page: PageMeta
  resetMeta: () => void
  searchLobby: (param: LobbySearchParams) => void
  resetSearchLobbies: () => void
} => {
  const dispatch = useAppDispatch()
  const searchLobbies = useAppSelector(selectors.getSearchLobbies)
  const page = useAppSelector(selectors.getSearchLobbiesMeta)
  const meta = useAppSelector(getLobbySearchMeta)
  const searchLobby = (param: LobbySearchParams) => dispatch(actions.searchLobby(param))
  const resetMeta = () => dispatch(clearMetaData(actions.searchLobby.typePrefix))
  const resetSearchLobbies = () => dispatch(actions.resetSearchLobbies())
  return { searchLobbies, searchLobby, resetMeta, resetSearchLobbies, meta, page }
}

export default useLobbySearch
