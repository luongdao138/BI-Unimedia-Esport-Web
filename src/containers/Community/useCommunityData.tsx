import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { useEffect, useState } from 'react'
import { CommunityResponse, CommunitySearchParams, PageMeta, CommunityFilterOption } from '@services/community.service'
import communityStore from '@store/community'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = communityStore
const getCommunitiesMeta = createMetaSelector(actions.getCommunityList)

const useCommunityData = (): {
  communities: CommunityResponse[]
  meta: Meta
  page: PageMeta
  loadMore: () => void
  onFilterChange: (filter: CommunityFilterOption) => void
  selectedFilter: CommunityFilterOption
  setSelectedFilter: (filter: CommunityFilterOption) => void
} => {
  const dispatch = useAppDispatch()
  const communities = useAppSelector(selectors.getCommunityList)
  const page = useAppSelector(selectors.getCommunityListMeta)
  const meta = useAppSelector(getCommunitiesMeta)
  const [selectedFilter, setSelectedFilter] = useState(CommunityFilterOption.all)
  const fetchCommunityData = (param: CommunitySearchParams) => dispatch(actions.getCommunityList(param))
  const resetMeta = () => dispatch(clearMetaData(actions.getCommunityList.typePrefix))
  const loadMore = () => {
    if (page && page.current_page < page.total_pages) {
      fetchCommunityData({ page: page.current_page + 1, keyword: '', filter: selectedFilter })
    }
  }

  const onFilterChange = (filter: CommunityFilterOption) => {
    setSelectedFilter(filter)
    dispatch(actions.clearCommunityData())
    fetchCommunityData({ page: 1, keyword: '', filter: filter })
  }
  useEffect(() => {
    return () => resetMeta()
  }, [])

  return { communities, meta, page, loadMore, onFilterChange, selectedFilter, setSelectedFilter }
}

export default useCommunityData
