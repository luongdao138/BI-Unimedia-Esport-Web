import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import searchStore from '@store/search'
import { UserSearchParams } from '@services/search.service'

const { selectors, actions } = searchStore
const getUserSearchMeta = createMetaSelector(actions.userSearch)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUserSearch = () => {
  const dispatch = useAppDispatch()
  const searchUsers = useAppSelector(selectors.getSearchUsers)
  const page = useAppSelector(selectors.getSearchUsersMeta)
  const meta = useAppSelector(getUserSearchMeta)
  const userSearch = (param: UserSearchParams) => dispatch(actions.userSearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.userSearch.typePrefix))
  const resetSearchUsers = () => dispatch(actions.resetSearchUsers())
  return { searchUsers, userSearch, resetMeta, resetSearchUsers, meta, page }
}

export default useUserSearch
