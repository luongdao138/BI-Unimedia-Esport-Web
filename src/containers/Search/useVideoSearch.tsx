import { useAppDispatch, useAppSelector } from '@store/hooks'
import searchStore from '@store/search'
import { SearchParams } from '@services/search.service'

const { selectors, actions } = searchStore

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useVideoSearch = () => {
  const dispatch = useAppDispatch()
  const searchType = useAppSelector(selectors.getSearchType)
  const searchVideoType = useAppSelector(selectors.getSearchVideoType)
  const searchKeyword = useAppSelector(selectors.getSearchKeyword)
  const setSearch = (param: SearchParams) => dispatch(actions.setSearchParams(param))
  return { searchType, searchKeyword, setSearch, searchVideoType }
}

export default useVideoSearch
