import { useAppDispatch, useAppSelector } from '@store/hooks'
import searchStore from '@store/search'
import { SearchParams } from '@services/search.service'

const { selectors, actions } = searchStore

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSearch = () => {
  const dispatch = useAppDispatch()
  const searchType = useAppSelector(selectors.getSearchType)
  const searchKeyword = useAppSelector(selectors.getSearchKeyword)
  const setSearch = (param: SearchParams) => dispatch(actions.setSearchParams(param))
  return { searchType, searchKeyword, setSearch }
}

export default useSearch
